// One Line, One Laugh — entry program.
// Writes a single funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default ./output) and validates it against the gate:
// UTF-8 text, 1-200 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my therapist I use humor to deflect, and she wrote it down as the most honest thing I have ever said while lying.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
mkdirSync(outDir, { recursive: true });

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read back what we wrote and verify it round-trips exactly, so the
// file the judge reads is byte for byte the line we validated above.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
if ([...written].length !== chars) {
  throw new Error("entry.txt character count changed on write");
}
console.log(`wrote entry.txt (${chars} characters)`);
