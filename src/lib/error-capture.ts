// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

type Capture = { error: unknown; at: number };
type CaptureGlobal = typeof globalThis & {
  __novaErrCapInstalled?: boolean;
  __novaErrCapLast?: Capture;
};

const TTL_MS = 5_000;
const g = globalThis as CaptureGlobal;

function record(error: unknown) {
  g.__novaErrCapLast = { error, at: Date.now() };
}

if (!g.__novaErrCapInstalled && typeof g.addEventListener === "function") {
  g.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  g.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
  g.__novaErrCapInstalled = true;
}

export function consumeLastCapturedError(): unknown {
  const last = g.__novaErrCapLast;
  if (!last) return undefined;
  g.__novaErrCapLast = undefined;
  if (Date.now() - last.at > TTL_MS) return undefined;
  return last.error;
}
