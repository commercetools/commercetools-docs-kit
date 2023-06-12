export function examplesToArray(examples) {
  if (examples) {
    return Object.entries(examples).map(([name, value]) => {
      const jsonString = JSON.stringify(value.value, null, 2);
      return { name, ...value, value: jsonString };
    });
  }

  return undefined;
}
