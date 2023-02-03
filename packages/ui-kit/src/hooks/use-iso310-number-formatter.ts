import { useCallback } from 'react';
import { useIntl } from 'react-intl';

// https://en.wikipedia.org/wiki/ISO_31-0#Numbers (now ISO 80000-1, but its text is not public)
const narrowNonBreakingSpace = '\u202F';

const useISO310NumberFormatter = () => {
  const intl = useIntl();
  return useCallback(
    (value: number) => {
      if (typeof value !== 'number') return `${value}`;

      return intl
        .formatNumberToParts(value, { maximumFractionDigits: 20 })
        .map(({ type, value }) =>
          type === 'group' ? narrowNonBreakingSpace : value
        )
        .join('');
    },
    [intl]
  );
};

export default useISO310NumberFormatter;
