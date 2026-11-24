// Ridiculous at First Glance, Real by the Second — make.fun entry
// One sentence (<=200 chars) pitching a bizarre startup that sounds like a
// joke until the business logic lands: crows paid in peanuts, councils billed
// by the kilo. Real precedent: cities have trained corvids to collect litter
// for food rewards; the pitch turns "ha, birds" into "cheapest crew in town".
import { mkdirSync, writeFileSync } from "node:fs";

// Gate check: the sealed scorer requires /output/entry.txt to be UTF-8 text
// of 1 to 200 characters, not only white space, in a single sentence.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) throw new Error(`gate: ${chars} chars, need 1-200`);
  if (!text.trim()) throw new Error("gate: entry is only white space");
  if (text.includes("\n")) throw new Error("gate: entry must be one sentence, no line breaks");
}

const ENTRY =
  "We train city crows to collect cigarette butts for peanuts, then charge councils by the kilo for the cheapest street-cleaning crew in the city.";

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Read back what was written and re-check it, so the file on disk is the
// entry the gate scores, byte for byte.
import { readFileSync } from "node:fs";
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
checkGate(written);
if (written !== ENTRY) throw new Error("read-back mismatch");

const chars = [...ENTRY].length;
console.log(`wrote ${outDir}/entry.txt (${chars} code points), verified: ${JSON.stringify(ENTRY)}`);
