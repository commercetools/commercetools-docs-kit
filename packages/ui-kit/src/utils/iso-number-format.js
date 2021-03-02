import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

const narrowNonBreakingSpace = '\u202F';

const formatNumber = (number) => {
  if (typeof number !== 'number') return number;

  var formatter = new Intl.NumberFormat('en', { maximumFractionDigits: 20 });
  return formatter
    .formatToParts(number)
    .map(({ type, value }) =>
      type === 'group' ? narrowNonBreakingSpace : value
    )
    .reduce((string, part) => string + part);
};

export default formatNumber;
