function capitalizeFirst(str) {
  if (str) {
    const firstChar = str.charAt(0).toUpperCase();
    const lastChars = str.substr(1, str.length);
    return `${firstChar}${lastChars}`;
  }

  return '';
}

export default capitalizeFirst;
