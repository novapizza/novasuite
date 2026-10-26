#!/usr/bin/env node
// Refreshes src/data/contributors.json for the About page from the GitHub API.
// Needs the GitHub CLI signed in with read access to the novapizza org:
//   node scripts/contributors.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ORG = "novapizza";
const OUT = fileURLToPath(new URL("../src/data/contributors.json", import.meta.url));

// Repo name → label shown on the About page (Nova Suite apps use their product name).
const LABELS = {
  novapad: "NovaPad",
  lumia: "Lumia",
  novafinder: "NovaFinder",
  novagitx: "NovaGitX",
  novaclipboard: "NovaClipboard",
  novakey: "NovaKey",
  nmtr: "nmtr",
  novaproxy: "NovaProxy",
  novacirrus: "Nova Cirrus",
  novasuite: "Nova Suite web",
};

function gh(path) {
  const out = execFileSync("gh", ["api", "--paginate", path], { encoding: "utf8" });
  // --paginate concatenates JSON arrays page by page ("][").
  return JSON.parse(
    `[${out
      .trim()
      .replace(/\]\s*\[/g, ",")
      .replace(/^\[|\]$/g, "")}]`,
  );
}

const members = gh(`orgs/${ORG}/members`).map((m) => m.login);
const repos = gh(`orgs/${ORG}/repos?type=public`).filter((r) => !r.fork && !r.archived);

const people = new Map();
for (const repo of repos) {
  let contributors = [];
  try {
    contributors = gh(`repos/${ORG}/${repo.name}/contributors`);
  } catch {
    continue; // empty repo
  }
  const label = LABELS[repo.name.toLowerCase()] ?? repo.name;
  for (const c of contributors) {
    if (c.type !== "User") continue;
    const person = people.get(c.login) ?? { login: c.login, id: c.id, repos: {} };
    person.repos[label] = (person.repos[label] ?? 0) + c.contributions;
    people.set(c.login, person);
  }
}

for (const person of people.values()) {
  const user = gh(`users/${person.login}`)[0];
  person.name = user.name || person.login;
}

const data = {
  generatedAt: new Date().toISOString().slice(0, 10),
  members,
  people: [...people.values()].map(({ login, name, id, repos }) => ({ login, name, id, repos })),
};
writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Wrote ${data.people.length} contributors (${members.length} members) to ${OUT}`);
