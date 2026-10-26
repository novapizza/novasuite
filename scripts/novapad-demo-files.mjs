#!/usr/bin/env node
// Writes the sample files used for NovaPad screenshots, so captures on Mac and
// Windows show the same content and no personal data:
//   node scripts/novapad-demo-files.mjs ~/NovaPad-demo
// events.ndjson is about 60 MB on purpose: NovaPad opens JSON of 50 MB or more
// in its record viewer instead of the text editor.
import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const outDir = process.argv[2] ?? join(homedir(), "NovaPad-demo");
mkdirSync(outDir, { recursive: true });

// Deterministic pseudo-random numbers, so every run writes the same files.
let seed = 42;
const rand = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
const pick = (list) => list[Math.floor(rand() * list.length)];

const cities = ["Hanoi", "Da Nang", "Ho Chi Minh City", "Singapore", "Tokyo", "Berlin", "Austin"];
const plans = ["free", "pro", "team", "enterprise"];
const events = ["page_view", "sign_up", "checkout", "search", "file_open", "export"];
const products = ["Margherita", "Pepperoni", "Quattro Formaggi", "Diavola", "Funghi", "Hawaiian"];

writeFileSync(
  join(outDir, "orders-service.ts"),
  `import { z } from "zod";

// An order as the kitchen sees it, after the payment has cleared.
export const Order = z.object({
  id: z.string().uuid(),
  customer: z.string().min(1),
  items: z.array(
    z.object({
      sku: z.string(),
      name: z.string(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().nonnegative(),
    }),
  ),
  status: z.enum(["placed", "baking", "out_for_delivery", "delivered"]),
  placedAt: z.coerce.date(),
});
export type Order = z.infer<typeof Order>;

const ETA_MINUTES: Record<Order["status"], number> = {
  placed: 25,
  baking: 15,
  out_for_delivery: 8,
  delivered: 0,
};

export function orderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function estimatedArrival(order: Order, now = new Date()): Date {
  return new Date(now.getTime() + ETA_MINUTES[order.status] * 60_000);
}

export async function fetchOpenOrders(baseUrl: string): Promise<Order[]> {
  const res = await fetch(\`\${baseUrl}/orders?status=open\`);
  if (!res.ok) throw new Error(\`Orders API returned \${res.status}\`);
  const body: unknown = await res.json();
  return z.array(Order).parse(body);
}

export function groupByStatus(orders: Order[]): Map<Order["status"], Order[]> {
  const groups = new Map<Order["status"], Order[]>();
  for (const order of orders) {
    const list = groups.get(order.status) ?? [];
    list.push(order);
    groups.set(order.status, list);
  }
  return groups;
}
`,
);

const csv = ["date,city,product,quantity,unit_price,revenue"];
for (let i = 0; i < 240; i++) {
  const day = String(1 + (i % 28)).padStart(2, "0");
  const month = String(1 + (Math.floor(i / 28) % 12)).padStart(2, "0");
  const quantity = 1 + Math.floor(rand() * 40);
  const price = (8 + Math.floor(rand() * 9) + 0.5).toFixed(2);
  csv.push(
    `2026-${month}-${day},${pick(cities)},${pick(products)},${quantity},${price},${(quantity * price).toFixed(2)}`,
  );
}
writeFileSync(join(outDir, "sales-2026.csv"), csv.join("\n") + "\n");

writeFileSync(
  join(outDir, "README.md"),
  `# Nova Pizza Orders API

A small service that takes pizza orders and tells the kitchen what to bake next.

## Getting started

1. Install dependencies with \`npm install\`.
2. Copy \`.env.example\` to \`.env\` and set \`ORDERS_DB_URL\`.
3. Run \`npm run dev\` and open http://localhost:3000.

## Endpoints

| Method | Path              | What it does                  |
| ------ | ----------------- | ----------------------------- |
| GET    | \`/orders\`         | Lists orders, newest first    |
| POST   | \`/orders\`         | Places a new order            |
| PATCH  | \`/orders/:id\`     | Moves an order to a new state |

## Order states

- **placed**: paid, waiting for the oven
- **baking**: in the oven
- **out_for_delivery**: on a scooter
- **delivered**: done

> Orders older than 24 hours are archived every night.

\`\`\`ts
const total = order.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
\`\`\`
`,
);

// About 60 MB of NDJSON, written as a stream to keep memory flat.
const ndjson = createWriteStream(join(outDir, "events.ndjson"));
const start = Date.UTC(2026, 0, 1);
for (let i = 0; i < 230_000; i++) {
  const record = {
    id: `evt_${String(i + 1).padStart(7, "0")}`,
    type: pick(events),
    timestamp: new Date(start + i * 47_000).toISOString(),
    user: {
      id: `usr_${1000 + Math.floor(rand() * 9000)}`,
      plan: pick(plans),
      city: pick(cities),
    },
    session: {
      device: pick(["mac", "windows", "ios", "android"]),
      durationMs: Math.floor(rand() * 600_000),
    },
    order: {
      product: pick(products),
      quantity: 1 + Math.floor(rand() * 4),
      total: +(rand() * 60 + 8).toFixed(2),
    },
    tags: [pick(["promo", "returning", "new", "mobile", "desktop"]), pick(["eu", "apac", "us"])],
  };
  if (!ndjson.write(JSON.stringify(record) + "\n")) {
    await new Promise((resolve) => ndjson.once("drain", resolve));
  }
}
ndjson.end();
await new Promise((resolve) => ndjson.on("finish", resolve));

console.log(`Demo files written to ${outDir}`);
