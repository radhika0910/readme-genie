# 🚀 Project Overview

This project is a JavaScript/TypeScript-based application that automatically generates documentation based on the codebase. It aims to improve developer experience by reducing manual effort in maintaining README files.

The tool scans all JS/TS files, analyzes the function declarations, and creates a human-readable README that includes purpose, flow, file usage, and setup instructions.

---

## 🔄 Project Flow

1. User runs the CLI tool.
2. The tool scans the directory and parses JS/TS files.
3. It identifies functions and structures.
4. Based on file names and function patterns, it infers descriptions.
5. It generates a well-structured README.md automatically.

---

## ⚙️ Installation & Setup

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
npx readme-genie
```

---

## 📁 Folder & File Structure

```
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── src/

```

---

## 🧠 File Purposes & Detected Functions

### src/analyze.js
**General-purpose code**
- `analyzeProject(dir)` — Auto-detected function.

### src/generate.js
**General-purpose code**
- `formatFolderStructure(dir, , )` — Auto-detected function.
- `inferFilePurpose(filename)` — Auto-detected function.
- `generateReadme()` — Auto-detected function.

---

## 🙌 Credits

Generated with ❤️ by [readme-genie]. Feel free to customize this file further to suit your unique project!
