function responsesToArray(responses) {
  if (responses) {
    return Object.entries(responses).map(([key, value]) => {
      return { code: parseInt(key, 10), ...value };
    });
  }

  return undefined;
}

export default responsesToArray;
