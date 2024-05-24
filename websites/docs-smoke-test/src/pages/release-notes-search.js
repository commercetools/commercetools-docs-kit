import { ThemeProvider } from '@commercetools-docs/gatsby-theme-docs';
import LayoutReleaseNotesSearch from '@commercetools-docs/gatsby-theme-docs/src/layouts/release-notes-search';
import algoliasearch from 'algoliasearch/lite';
import {
  Hits,
  InstantSearch,
  RefinementList,
  useRange,
} from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import { IntlProvider } from 'react-intl';
import DateRangeField from '@commercetools-uikit/date-range-field';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const convertDateToTimestamp = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString || !dateString.match(dateRegex)) {
    return null;
  }
  const date = new Date(dateString);
  const timestamp = Math.floor(date.getTime() / 1000);
  return timestamp;
};

const DateRangeInput = (props) => {
  // Two important concept to keep in mind:
  // - `range` is the maximum and minimum selectable values, they don't make much sense in the context of a date picker
  // - `start` (stupid name) is the actual selected range, it's an array of two values. It must always be defined, meaning that
  // when date picker is cleared the values must be set to undefined which automatically sets the start to the value of `range`
  const { canRefine, refine } = useRange(props);
  const [value, setValue] = useState([]);

  const handleDateChange = (event) => {
    const changeValue = event.target.value;
    if (!changeValue || changeValue.length !== 2) {
      setValue([]);
    }
    setValue(changeValue);
  };

  useEffect(() => {
    if (value.length !== 2) {
      refine(undefined);
    }
    refine([
      convertDateToTimestamp(value[0]),
      convertDateToTimestamp(value[1]),
    ]);
  }, [value, refine]);

  return (
    <DateRangeField
      horizontalConstraint={7}
      title="Release Date"
      value={value}
      onChange={handleDateChange}
      isDisabled={!canRefine}
    />
  );
};

const searchClient = algoliasearch();
// REDACTED: App ID
// REDACTED: API key

const ReleaseNotesSearch = () => {
  return (
    <IntlProvider locale="en">
      <ThemeProvider>
        <LayoutReleaseNotesSearch>
          <InstantSearch searchClient={searchClient} indexName="docs-releases">
            <RefinementList attribute="product" />
            <DateRangeInput
              attribute="dateTimestamp"
              min={0} // min and max are required as they define the selected range and it must always be defined.
              max={2537011284}
            />
            <Hits hitComponent={Hit}></Hits>
          </InstantSearch>
        </LayoutReleaseNotesSearch>
      </ThemeProvider>
    </IntlProvider>
  );
};
const Hit = ({ hit }) => {
  return <p>{hit.date}</p>;
};

Hit.propTypes = {
  hit: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReleaseNotesSearch;
