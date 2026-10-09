import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import ts from 'typescript';

const featuresDirectory = fileURLToPath(new URL('../src/app/features/', import.meta.url));
const dataRoles = ['metadata', 'examples', 'code', 'lesson'];
const failures = [];
const features = readdirSync(featuresDirectory, { withFileTypes: true }).filter((entry) =>
  entry.isDirectory(),
);

for (const feature of features) {
  const slug = feature.name;
  const directory = join(featuresDirectory, slug);
  const prefix = slug.replaceAll('-', '_').toUpperCase();
  const expectedFiles = [
    `${slug}.page.ts`,
    `algorithm/${slug}.algorithm.ts`,
    ...dataRoles.map((role) => `data/${slug}.${role}.ts`),
  ];

  for (const filename of expectedFiles) {
    if (!existsSync(join(directory, filename))) failures.push(`${slug}: missing ${filename}`);
  }

  const dataDirectory = join(directory, 'data');
  if (!existsSync(dataDirectory)) continue;
  const expectedData = new Set(dataRoles.map((role) => `${slug}.${role}.ts`));
  for (const filename of readdirSync(dataDirectory)) {
    if (!expectedData.has(filename)) failures.push(`${slug}: unexpected data file ${filename}`);
  }

  for (const role of dataRoles) {
    const filename = join(dataDirectory, `${slug}.${role}.ts`);
    if (!existsSync(filename)) continue;
    const ast = ts.createSourceFile(
      filename,
      readFileSync(filename, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    const expectedExport = `${prefix}_${role === 'metadata' ? 'ALGORITHM' : role.toUpperCase()}`;
    const exports = ast.statements
      .filter(
        (statement) =>
          ts.isVariableStatement(statement) &&
          statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
      )
      .flatMap((statement) =>
        statement.declarationList.declarations.map((declaration) => declaration.name.getText(ast)),
      );
    if (exports.length !== 1 || exports[0] !== expectedExport) {
      failures.push(`${slug}: ${role} must export only ${expectedExport}`);
    }
  }

  const pagePath = join(directory, `${slug}.page.ts`);
  if (!existsSync(pagePath)) continue;
  const ast = ts.createSourceFile(
    pagePath,
    readFileSync(pagePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  const component = ast.statements.find(ts.isClassDeclaration);
  const property = component?.members[0];
  if (
    component?.members.length !== 1 ||
    !property ||
    !ts.isPropertyDeclaration(property) ||
    property.name.getText(ast) !== 'lesson' ||
    property.initializer?.getText(ast) !== `${prefix}_LESSON`
  ) {
    failures.push(`${slug}: page class must contain only readonly lesson = ${prefix}_LESSON`);
  }
  const imports = ast.statements
    .filter(ts.isImportDeclaration)
    .map((statement) => statement.moduleSpecifier.text);
  if (imports.length !== 3 || !imports.includes(`./data/${slug}.lesson`)) {
    failures.push(
      `${slug}: page must import Angular, its lesson renderer, and its lesson configuration`,
    );
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `All ${features.length} algorithm features follow the same file and export structure.`,
  );
}
