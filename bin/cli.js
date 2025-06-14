#!/usr/bin/env node

import { analyzeProject } from '../src/analyze.js';
import { generateReadme } from '../src/generate.js';

(async () => {
  const result = await analyzeProject();
  generateReadme(result);
})();
