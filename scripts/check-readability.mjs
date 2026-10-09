import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../src/app/', import.meta.url));
const failures = [];
let implementationCount = 0;

function checkTypeScript(source, label) {
  const ast = ts.createSourceFile(label, source, ts.ScriptTarget.Latest, true);
  for (const diagnostic of ast.parseDiagnostics) {
    failures.push(`${label}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`);
  }
  function checkBlock(statement) {
    if (statement && !ts.isBlock(statement) && !ts.isIfStatement(statement)) {
      const line = ast.getLineAndCharacterOfPosition(statement.getStart(ast)).line + 1;
      failures.push(`${label}:${line}: give control flow an explicit block`);
    }
  }
  function visit(node) {
    if (ts.isIfStatement(node)) {
      checkBlock(node.thenStatement);
      checkBlock(node.elseStatement);
    }
    if (
      ts.isForStatement(node) ||
      ts.isForOfStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isWhileStatement(node) ||
      ts.isDoStatement(node)
    ) {
      checkBlock(node.statement);
    }
    if (ts.isVariableStatement(node) && node.declarationList.declarations.length > 1) {
      failures.push(`${label}: declare each variable separately`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

function checkDisplayedSource(source, language, label) {
  implementationCount++;
  if (language === 'TYPESCRIPT') {
    checkTypeScript(source, label);
  }
  source.split('\n').forEach((line, index) => {
    const location = `${label}:${index + 1}`;
    if ([...line.matchAll(/@step:\w+/g)].length > 1) {
      failures.push(`${location}: use one step marker per line`);
    }
    if (/^\s*(?:\/\/|#) @step:\w+\s*$/.test(line)) {
      failures.push(`${location}: attach the step marker to visible code`);
    }
    // Ignore literals and comments before checking statement separators.
    const code = line
      .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""')
      .replace(language === 'PYTHON' ? /#.*$/ : /\/\/.*$/, '');
    let depth = 0;
    let separators = 0;
    for (const character of code) {
      if (character === '(' || character === '[') {
        depth++;
      }
      if (character === ')' || character === ']') {
        depth--;
      }
      if (character === ';' && depth === 0) {
        separators++;
      }
    }
    if (separators > (language === 'PYTHON' ? 0 : 1)) {
      failures.push(`${location}: put each statement on its own line`);
    }
    if (language === 'PYTHON' && /^\s*(?:if|elif|else|while|for)\b.*:\s*\S/.test(code)) {
      failures.push(`${location}: expand the Python control-flow body`);
    }
  });
}

function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) {
      inspect(filename);
    } else if (filename.endsWith('.ts')) {
      const source = readFileSync(filename, 'utf8');
      checkTypeScript(source, filename);
      if (filename.endsWith('.code.ts')) {
        const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
        for (const statement of ast.statements.filter(ts.isVariableStatement)) {
          for (const declaration of statement.declarationList.declarations) {
            const language = declaration.name
              .getText(ast)
              .match(/(TYPESCRIPT|PYTHON|CSHARP|JAVA)_SOURCE$/)?.[1];
            if (
              language &&
              declaration.initializer &&
              ts.isNoSubstitutionTemplateLiteral(declaration.initializer)
            ) {
              checkDisplayedSource(
                declaration.initializer.text,
                language,
                `${filename} (${language})`,
              );
            }
          }
        }
      }
    }
  }
}

inspect(root);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `App TypeScript and ${implementationCount} displayed implementations pass readability checks.`,
  );
}
