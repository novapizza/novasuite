import { useMemo, useState } from "react";
import contributors from "@/data/contributors.json";
import { cn } from "@/lib/utils";

type Person = {
  login: string;
  name: string;
  id: number;
  repos: Record<string, number>;
  commits: number;
  member: boolean;
  tint: string;
};

// Written by scripts/contributors.mjs.
type ContributorData = {
  generatedAt: string;
  members: string[];
  people: { login: string; name: string; id: number; repos: Record<string, number> }[];
};
const data = contributors as unknown as ContributorData;

const TINTS = [
  "#C4B5FD",
  "#F0ABFC",
  "#67E8F9",
  "#F9A8D4",
  "#93C5FD",
  "#FCD34D",
  "#FDBA74",
  "#BEF264",
  "#9BE3B4",
  "#A5B4FC",
];

const people: Person[] = data.people
  .map((p) => ({
    ...p,
    commits: Object.values(p.repos).reduce((n, c) => n + c, 0),
    member: data.members.includes(p.login),
  }))
  .sort((a, b) => b.commits - a.commits)
  .map((p, i) => ({ ...p, tint: TINTS[i % TINTS.length] }));

const totalCommits = people.reduce((n, p) => n + p.commits, 0);
const memberCount = people.filter((p) => p.member).length;

function plural(n: number, word: string) {
  return `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;
}

function reposByCommits(p: Person) {
  return Object.keys(p.repos).sort((a, b) => p.repos[b] - p.repos[a]);
}

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Segment = string | { login: string };

// Rows of random letters with every login hidden somewhere in them. Seeded so
// the server and the client render the same field.
function letterField(logins: string[]): Segment[][] {
  const rnd = seeded(20261016);
  const ROWS = 12;
  const COLS = 140;
  const abc = "abcdefghijklmnopqrstuvwxyz0123456789-";
  const rows = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => abc[Math.floor(rnd() * abc.length)]),
  );
  const marks: { c: number; login: string }[][] = Array.from({ length: ROWS }, () => []);
  logins.forEach((login, i) => {
    for (let tries = 0; tries < 60; tries++) {
      const r = (i * 7 + tries * 3) % ROWS;
      const c = 24 + Math.floor(rnd() * (92 - login.length));
      const free = marks[r].every(
        (m) => c + login.length + 3 < m.c || c > m.c + m.login.length + 3,
      );
      if (free) {
        marks[r].push({ c, login });
        break;
      }
    }
  });
  return rows.map((chars, r) => {
    const segs: Segment[] = [];
    let at = 0;
    for (const m of marks[r].sort((a, b) => a.c - b.c)) {
      if (m.c > at) segs.push(chars.slice(at, m.c).join(""));
      segs.push({ login: m.login });
      at = m.c + m.login.length;
    }
    if (at < COLS) segs.push(chars.slice(at).join(""));
    return segs;
  });
}

function Avatar({ person, size }: { person: Person; size: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold text-[#16131F]"
      style={{ width: size, height: size, background: person.tint, fontSize: size * 0.38 }}
    >
      {person.name.charAt(0).toUpperCase()}
      {/* Empty alt: the name is always shown next to the avatar. */}
      <img
        src={`https://avatars.githubusercontent.com/u/${person.id}?s=${size * 2}&v=4`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className="absolute inset-0"
      />
    </span>
  );
}

export function AboutPage() {
  const field = useMemo(() => letterField(people.map((p) => p.login)), []);
  const [active, setActive] = useState<string | null>(null);
  const activePerson = people.find((p) => p.login === active);
  const byLogin = useMemo(() => new Map(people.map((p) => [p.login, p])), []);

  const groups = [
    {
      title: "Members",
      description: "The novapizza org on GitHub",
      people: people.filter((p) => p.member),
    },
    {
      title: "Contributors",
      description: "Pull requests from friends of the crew",
      people: people.filter((p) => !p.member),
    },
  ].filter((g) => g.people.length > 0);

  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-border">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-x-12 gap-y-6 px-4 pb-8 pt-[72px] sm:px-6">
          <div className="flex flex-[1_1_520px] flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-nv-accent">
              About
            </span>
            <h1
              id="about-title"
              className="m-0 font-display text-[clamp(40px,6vw,56px)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Written by people,
              <br />
              one commit at a time.
            </h1>
            <p className="m-0 max-w-[560px] text-base leading-relaxed text-muted-foreground">
              Nova Suite is made by the crew at{" "}
              <a
                href="https://github.com/novapizza"
                className="font-semibold text-foreground underline-offset-2 hover:underline"
              >
                NOVAPIZZA
              </a>
              . {plural(memberCount, "member")} and{" "}
              {plural(people.length - memberCount, "outside contributor")},{" "}
              {plural(totalCommits, "commit")} so far.
            </p>
          </div>
          <div aria-live="polite" className="flex min-h-[58px] flex-[0_1_360px] items-center">
            {activePerson ? (
              <div className="flex items-center gap-3 rounded-full border border-line-strong bg-card py-2.5 pl-2.5 pr-[18px]">
                <Avatar person={activePerson} size={36} />
                <span className="text-sm">
                  <strong>{activePerson.name}</strong>{" "}
                  <span className="text-muted-foreground">
                    · {plural(activePerson.commits, "commit")} in{" "}
                    {plural(Object.keys(activePerson.repos).length, "repo")}
                  </span>
                </span>
              </div>
            ) : (
              <span className="text-[13px] text-muted-foreground">
                Find the names hidden in the letters below.
              </span>
            )}
          </div>
        </div>

        {/* Decorative: the same people are listed, accessibly, in the cards below. */}
        <div
          aria-hidden="true"
          className={cn("nv-field flex flex-col items-start pb-10 pt-2", active && "is-dim")}
        >
          {field.map((segs, r) => (
            <div
              key={r}
              className="nv-row"
              style={{
                animationDuration: `${70 + ((r * 37) % 50)}s`,
                animationDirection: r % 2 ? "reverse" : "normal",
              }}
            >
              {/* Content is doubled so translateX(-50%) loops seamlessly. */}
              {[...segs, ...segs].map((g, i) =>
                typeof g === "string" ? (
                  <span key={i} className="nv-noise">
                    {g}
                  </span>
                ) : (
                  <span
                    key={i}
                    className={cn(
                      "nv-name",
                      byLogin.get(g.login)?.member && "is-member",
                      active === g.login && "is-on",
                    )}
                    onMouseEnter={() => setActive(g.login)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {g.login}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Contributors"
        className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 pb-24 pt-16 sm:px-6"
      >
        {groups.map((g) => (
          <div key={g.title} className="flex flex-col gap-[18px]">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">
                {g.title}
              </h2>
              <span className="text-sm text-muted-foreground">{g.description}</span>
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3.5 p-0">
              {g.people.map((p) => {
                const repos = reposByCommits(p);
                return (
                  <li key={p.login}>
                    <a
                      href={`https://github.com/${p.login}`}
                      onMouseEnter={() => setActive(p.login)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(p.login)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "nv-crew flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-foreground",
                        active === p.login && "is-on",
                      )}
                    >
                      <Avatar person={p} size={48} />
                      <span className="flex min-w-0 flex-col gap-[3px]">
                        <span className="text-[15px] font-semibold">{p.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">@{p.login}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {plural(p.commits, "commit")} · {repos.slice(0, 3).join(", ")}
                          {repos.length > 3 ? ` +${repos.length - 3}` : ""}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="m-0 text-[13px] text-muted-foreground">
          Commit counts from GitHub contributors across public novapizza repos, updated{" "}
          {data.generatedAt}.
        </p>
      </section>
    </>
  );
}
