import path from 'path';
import fs from 'fs';

export function resolveExampleFile(fileNodeDir, filePath) {
  if (typeof filepath === 'string' && filePath.includes('!include')) {
    const exampleAbsolutePath = path.resolve(fileNodeDir, filePath);
    return fs.readFileSync(exampleAbsolutePath, 'utf8');
  }
  return JSON.stringify(filePath, null, 2);
}

export function examplesToArray(examples, fileNodeDir, resolveExampleFile) {
  if (examples) {
    return Object.entries(examples).map(([name, value]) => {
      const jsonString = resolveExampleFile(fileNodeDir, value.value);
      return { name, ...value, value: jsonString };
    });
  }

  return undefined;
}
