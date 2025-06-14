import fs from 'fs';
import path from 'path';
import {globby } from 'globby';
import * as babel from '@babel/parser';
import traverse from '@babel/traverse';

export async function analyzeProject(dir) {
  const paths = await globby([`${dir}/**/*.js`, `${dir}/**/*.ts`], {
    gitignore: true,
  });

  const functions = [];

  for (const file of paths) {
    const content = fs.readFileSync(file, 'utf8');
    let ast;
    try {
      ast = babel.parse(content, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });
    } catch {
      continue;
    }

    traverse.default(ast, {
      FunctionDeclaration({ node }) {
        functions.push({
          name: node.id?.name || 'anonymous',
          file,
          params: node.params.map(p => p.name).join(', '),
        });
      },
    });
  }

  return { functions };
}
