function headersToArray(headers) {
  if (headers) {
    return Object.entries(headers).map(([key, value]) => {
      return { header: key, ...value };
    });
  }

  return undefined;
}

export default headersToArray;
