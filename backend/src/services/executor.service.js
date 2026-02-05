const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const { randomUUID } = require('crypto');
const { resolveLanguage, getTempFilePath } = require('../utils/languageConfig');

const TIMEOUT_MS = 2000;

const runCommand = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    const { input, ...execOptions } = options;
    const start = Date.now();
    const child = exec(
      command,
      {
        timeout: TIMEOUT_MS,
        maxBuffer: 1024 * 1024,
        ...execOptions
      },
      (error, stdout, stderr) => {
        const end = Date.now();
        const executionTime = `${end - start}ms`;
        if (error) {
          return reject({
            stdout,
            stderr: stderr || error.message,
            exitCode: error.code ?? 1,
            executionTime
          });
        }
        return resolve({
          stdout,
          stderr,
          exitCode: 0,
          executionTime
        });
      }
    );

    if (input !== undefined && child.stdin) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
};

const extractJavaClassName = (code) => {
  const match = code.match(/public\s+class\s+(\w+)/);
  return match ? match[1] : 'Main';
};

const executeCode = async ({ language, code, input }) => {
  const config = resolveLanguage(language);
  if (!config) {
    throw new Error('Unsupported language');
  }

  const tempDir = path.join('/tmp', `exec-${randomUUID()}`);
  await fs.mkdir(tempDir, { recursive: true });

  let sourceFilePath = '';
  let outputBinaryPath = '';
  let className = '';

  try {
    if (language.toLowerCase() === 'java') {
      className = extractJavaClassName(code);
      const fileName = config.resolveFileName(className);
      sourceFilePath = path.join(tempDir, fileName);
    } else {
      sourceFilePath = getTempFilePath(tempDir, 'main', config.extension);
    }

    await fs.writeFile(sourceFilePath, code, 'utf8');

    if (language.toLowerCase() === 'cpp') {
      outputBinaryPath = path.join(tempDir, 'main.out');
      await runCommand(config.compile(sourceFilePath, outputBinaryPath), { cwd: tempDir });
      return await runCommand(config.run(outputBinaryPath), {
        cwd: tempDir,
        input
      });
    }

    if (language.toLowerCase() === 'java') {
      await runCommand(config.compile(sourceFilePath), { cwd: tempDir });
      return await runCommand(config.run(className, tempDir), {
        cwd: tempDir,
        input
      });
    }

    return await runCommand(config.run(sourceFilePath), {
      cwd: tempDir,
      input
    });
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
};

module.exports = {
  executeCode
};
