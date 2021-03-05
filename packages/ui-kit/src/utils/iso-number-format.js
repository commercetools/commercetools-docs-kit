import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

// https://en.wikipedia.org/wiki/ISO_31-0#Numbers (now ISO 80000-1, but its text is not public)
const narrowNonBreakingSpace = '\u202F';
const formatter = new Intl.NumberFormat('en', { maximumFractionDigits: 20 });

const formatNumber = (number) => {
  if (typeof number !== 'number') return number;

  return formatter
    .formatToParts(number)
    .map(({ type, value }) =>
      type === 'group' ? narrowNonBreakingSpace : value
    )
    .reduce((string, part) => string + part);
};

export default formatNumber;
