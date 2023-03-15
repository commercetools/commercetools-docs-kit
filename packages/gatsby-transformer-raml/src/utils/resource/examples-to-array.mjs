import path  from "path";
import fs  from "fs";


export function resolveExampleFile(fileNodeDir, filePath) {
  const exampleAbsolutePath = path.resolve(fileNodeDir, filePath);
  return fs.readFileSync(exampleAbsolutePath, 'utf8');
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
