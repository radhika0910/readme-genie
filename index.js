#!/usr/bin/env node
import { program } from 'commander';
import { analyzeProject } from './src/analyze.js';
import { generateReadme } from './src/generate.js';

program
  .version('1.0.0')
  .description('Generate README.md from source code')
  .option('-d, --dir <path>', 'Directory to analyze', '.')
  .action(async (options) => {
    console.log('🔍 Scanning project...');
    const data = await analyzeProject(options.dir);
    console.log('📄 Generating README...');
    generateReadme(data);
    console.log('✅ README.md created!');
  });

program.parse(process.argv);
