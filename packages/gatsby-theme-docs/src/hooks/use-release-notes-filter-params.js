import React from 'react';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { encode, decode } from 'qss';

const useReleaseNotesFilterParams = () => {
  const location = useLocation();

  const setFilterParams = React.useCallback(
    (params) => {
      const currentQueryParams = decode(location.search.substring(1));
      const newQueryString = encode({
        ...currentQueryParams,
        ...params,
      });

      if (newQueryString) {
        navigate(`?${newQueryString}`);
      } else {
        navigate(`${location.origin}${location.pathname}`);
      }
    },
    [location.search, location.pathname, location.origin]
  );

  const queryParams = decode(location.search.substring(1));

  const filterTopics = queryParams.filterTopics || [];

  return [
    {
      fromFilterDate: queryParams.fromFilterDate,
      toFilterDate: queryParams.toFilterDate,
      // Make sure that this is always an array
      filterTopics: Array.isArray(filterTopics) ? filterTopics : [filterTopics],
    },
    setFilterParams,
  ];
};

export default useReleaseNotesFilterParams;
