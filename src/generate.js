// src/generate.js
import fs from 'fs';
import path from 'path';

// Load project metadata from package.json
function getProjectMetadata() {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    return {
      name: pkg.name || 'Untitled Project',
      description: pkg.description || 'No description available.',
      scripts: pkg.scripts ? Object.keys(pkg.scripts) : [],
    };
  } catch {
    return {
      name: 'Untitled Project',
      description: 'No description available.',
      scripts: [],
    };
  }
}

// Format folder structure recursively (folders only + root files + index files)
function formatFolderStructure(dir, prefix = '', root = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const filtered = entries.filter(entry => {
    const isLongFolder = entry.isDirectory() && entry.name.length > 20;
    const isExcluded = ['node_modules', '.git'].includes(entry.name);
    return !isExcluded && !isLongFolder;
  });

  return filtered.map(entry => {
    const fullPath = path.join(dir, entry.name);
    const line = `${prefix}├── ${entry.name}`;

    if (entry.isDirectory()) {
      const children = formatFolderStructure(fullPath, prefix + '│   ', root);
      return `${line}/\n${children}`;
    } else if (dir === root || entry.name.startsWith('index.')) {
      return line;
    } else {
      return null;
    }
  }).filter(Boolean).join('\n');
}

// Infer purpose of file based on name
function inferFilePurpose(filename) {
  const name = path.basename(filename);
  if (name.includes('util')) return 'Common helper or utility functions';
  if (name.includes('api')) return 'Handles external or internal API calls';
  if (name.includes('config')) return 'Configuration settings for the app';
  if (name.includes('index')) return 'Primary entry point of the project';
  if (name.includes('route')) return 'Application routing logic';
  if (name.includes('controller')) return 'Logic for handling user actions or backend routes';
  return 'General-purpose code';
}

export function generateReadme({ functions }) {
  const folderStructure = formatFolderStructure('./');
  const { name, description, scripts } = getProjectMetadata();

  const fileSummary = functions.reduce((acc, fn) => {
    if (fn.file.includes('node_modules')) return acc;
    if (!acc[fn.file]) acc[fn.file] = [];
    acc[fn.file].push(`- \`${fn.name}(${fn.params})\` — Auto-detected function.`);
    return acc;
  }, {});

  const fileDescriptions = Object.keys(fileSummary).map(file => {
    const purpose = inferFilePurpose(file);
    return `### ${file}\n**${purpose}**\n${fileSummary[file].join('\n')}`;
  }).join('\n\n');

  const projectFlow = `
## 🔄 Project Flow

1. Install dependencies with \`npm install\`.
2. Run the development server with \`${scripts.includes('start') ? 'npm start' : 'your-start-command'}\`.
3. Explore the folder structure.
4. Modify or extend your components as needed.
5. Generate your README anytime with \`npx readme-genie\`.
`;

  const readmeContent = `
# 🚀 ${name.charAt(0).toUpperCase() + name.slice(1)}

${description}

---

${projectFlow}

---

## ⚙️ Installation & Setup

\`\`\`bash
git clone <your-repo-url>
cd ${name}
npm install
npx readme-genie
\`\`\`

---

## 📁 Folder & File Structure

\`\`\`
${folderStructure}
\`\`\`

---

## 🧠 File Purposes & Detected Functions

${fileDescriptions}

---

## 🙌 Credits

Generated with ❤️ by [readme-genie]. Feel free to customize this file further to suit your unique project!Happy coding! 🤗
`;

  fs.writeFileSync('README.md', readmeContent.trim() + '\n');
}
