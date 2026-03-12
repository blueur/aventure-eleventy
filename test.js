import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execSync } from "child_process";

test("présence des fichiers et dossiers", () => {
  // Liste des chemins attendus dans le projet.
  const expectedPaths = [
    "_data/aventure.json",
    "_includes/base.njk",
    ".git",
    ".github/workflows/deploy.yml",
    ".gitignore",
    "aventure-pages.html",
    "eleventy.config.js",
    "eslint.config.js",
    "index.md",
    "package.json",
    "test.js",
  ];
  // Vérifie que chaque chemin existe dans le projet.
  expectedPaths.forEach((path) => {
    assert.ok(
      fs.existsSync(path),
      `Le fichier ou dossier ${path} doit exister.`,
    );
  });
});

test("validation des fichiers", () => {
  // Exécute la validation en utilisant https://eslint.org/
  try {
    const output = execSync("npx eslint").toString();
    console.log(output);
  } catch (error) {
    assert.fail(error.output);
  }
});

test("construction du site", () => {
  // Exécute la construction en utilisant https://www.11ty.dev/
  try {
    const output = execSync("npx @11ty/eleventy").toString();
    console.log(output);
  } catch (error) {
    assert.fail(error.output);
  }
});
