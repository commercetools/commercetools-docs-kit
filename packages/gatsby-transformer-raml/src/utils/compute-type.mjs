function computeType(value) {
  /**
   * More info about why we need this better type checker here:
   * https://blog.logrocket.com/javascript-typeof-2511d53a1a62/
   */
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
}

export default computeType;
