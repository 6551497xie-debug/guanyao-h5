import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const persistenceAdapterSuffix = "PersistenceAdapter.ts";

function walkSourceFiles(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkSourceFiles(absolutePath));
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

function isLocalStorageReference(node) {
  if (ts.isIdentifier(node) && node.text === "localStorage") {
    const parent = node.parent;

    if (
      (ts.isPropertySignature(parent) ||
        ts.isPropertyDeclaration(parent) ||
        ts.isMethodSignature(parent) ||
        ts.isMethodDeclaration(parent) ||
        ts.isPropertyAssignment(parent)) &&
      parent.name === node
    ) {
      return false;
    }

    return true;
  }

  return (
    ts.isStringLiteral(node) &&
    node.text === "localStorage" &&
    ts.isElementAccessExpression(node.parent) &&
    node.parent.argumentExpression === node
  );
}

const sourceFiles = walkSourceFiles(srcDir);
const persistenceAdapters = sourceFiles.filter((file) => file.endsWith(persistenceAdapterSuffix));
const violations = [];

for (const file of sourceFiles) {
  if (file.endsWith(persistenceAdapterSuffix)) continue;

  const source = fs.readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function inspect(node) {
    if (isLocalStorageReference(node)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      const relativePath = path.relative(rootDir, file).split(path.sep).join("/");
      violations.push(`${relativePath}:${line + 1}:${character + 1}`);
    }

    ts.forEachChild(node, inspect);
  }

  inspect(sourceFile);
}

if (violations.length > 0) {
  console.error("[PERSISTENCE BOUNDARIES] FAIL");
  console.error("localStorage access must stay inside *PersistenceAdapter.ts files:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log(
  `[PERSISTENCE BOUNDARIES] PASS | ${persistenceAdapters.length} persistence adapters own localStorage access`,
);
