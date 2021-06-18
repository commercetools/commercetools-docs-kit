const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

// if the date does not contain timezone, JS Date() is fine
export const parseIsoDate = (dateString) => {
  // as an extra safety net enforce UTC midnight
  const UTCDateString = dateString + 'T00:00:00.000Z';
  const date = new Date(UTCDateString);
  return !isNaN(date.valueOf()) && isoDateRegex.test(dateString) ? date : false;
};

// Canada has adopted ISO-8601 so it's used as a replacement for the missing
// explicit ISO format support in Javascript Intl
export const IsoDateFormat = new Intl.DateTimeFormat('en-CA', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
});

// For docs content we have adopted the British style "4 December 1970" format.
export const DocsDateFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// if you have to parse such a "docs" date, you likely have a different root problem,
// formatted dates should never have to be parsed.
// Worst case use Luxon. Do not use moment.js any more. It's unmaintained and too large.
