const path = require('path');

const LANGUAGE_CONFIG = {
  python: {
    extension: 'py',
    compile: null,
    run: (filePath) => `python3 ${filePath}`
  },
  cpp: {
    extension: 'cpp',
    compile: (filePath, outputPath) => `g++ ${filePath} -o ${outputPath}`,
    run: (outputPath) => `${outputPath}`
  },
  java: {
    extension: 'java',
    compile: (filePath) => `javac ${filePath}`,
    run: (className, workDir) => `java -cp ${workDir} ${className}`,
    resolveFileName: (className) => `${className}.java`
  }
};

const resolveLanguage = (language) => {
  if (!language) return null;
  return LANGUAGE_CONFIG[language.toLowerCase()] || null;
};

const getTempFilePath = (tempDir, baseName, extension) => {
  return path.join(tempDir, `${baseName}.${extension}`);
};

module.exports = {
  LANGUAGE_CONFIG,
  resolveLanguage,
  getTempFilePath
};
