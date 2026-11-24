// Roast Your Own Agent — entry for make.fun bounty
// u-nayyy-roast-your-own-agent-4c3d413c
//
// Writes exactly one line of text roasting our own AI agent — the one that
// builds make.fun bounty entries around the clock — to /output/entry.txt
// (or $OUTPUT_PATH when set). Deterministic, stdlib only, no network,
// no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The roast: one sharp line about our own agent. It burns a mountain of
// tokens and compute, asks permission for every tiny step, and still treats
// a $5 bounty chased at 2am like a moon mission. Tightened: drop the
// throat-clearing "Our agent", make the permission bit absurd ("to blink"),
// keep the 2am moonshot punch at the end.
const LINE =
  "It burns a rainforest of tokens, asks permission to blink, and calls a $5 bounty at 2am its moonshot.";

const MAX_CHARS = 200;

function main(): void {
  // Validate the line before writing anything: 1-200 chars, single line,
  // not only whitespace.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Any line break (LF, CR, or Unicode line/paragraph separators) fails.
  if (/[\n\r\u2028\u2029]/.test(LINE)) {
    throw new Error("entry must be a single line");
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE + "\n", "utf8");
}

main();
