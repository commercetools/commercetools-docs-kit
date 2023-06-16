import prettier from 'prettier';

export function examplesToArray(examples) {
  if (examples) {
    return Object.entries(examples).map(([name, value]) => {
      const jsonString = JSON.stringify(value.value, null, 2);
      const formattedJSONString = prettier.format(jsonString, {
        semi: false,
        parser: 'json',
      });
      return { name, ...value, value: formattedJSONString };
    });
  }

  return undefined;
}
