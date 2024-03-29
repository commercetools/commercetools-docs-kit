/* eslint-disable */
// From https://github.com/euank/node-parse-numeric-range
// The package does not ship with CommonJS modules, so we just copy over the implementation.
export default function parsePart(string: string) {
  let res: number[] = [],
    m;
  for (let str of string.split(',').map((str: any) => str.trim())) {
    // just a number
    if (/^-?\d+$/.test(str)) {
      res.push(parseInt(str, 10));
    } else if (
      (m = str.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
    ) {
      // 1-5 or 1..5 (equivilant) or 1...5 (doesn't include 5)
      let [_, lhs, sep, rhs] = m;

      if (lhs && rhs) {
        lhs = parseInt(lhs);
        rhs = parseInt(rhs);
        const incr = lhs < rhs ? 1 : -1;

        // Make it inclusive by moving the right 'stop-point' away by one.
        if (sep === '-' || sep === '..' || sep === '\u2025') rhs += incr;

        for (let i: number = lhs; i !== rhs; i += incr) res.push(i);
      }
    }
  }
  return res;
}
