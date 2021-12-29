import { parseIsoDate } from '@commercetools-docs/ui-kit';
import { useLocation } from '@reach/router';
import { decode } from 'qss';

const useFilteredReleaseNotes = (releaseNotesNodes) => {
  const location = useLocation();
  const queryParams = decode(location.search.substring(1));
  const hasActiveFilters =
    queryParams.fromFilterDate ||
    queryParams.toFilterDate ||
    queryParams.filterTopics;
  if (!hasActiveFilters) return releaseNotesNodes;

  return releaseNotesNodes.filter((releaseNote) => {
    let releaseNoteDateIsSameOrAfterFromFilterDate = true;
    let releaseNoteDateIsSameOrBeforeToFilterDate = true;
    let foundTopicInFilter = true;

    if (queryParams.fromFilterDate) {
      releaseNoteDateIsSameOrAfterFromFilterDate =
        new Date(releaseNote.isoDate) >=
        parseIsoDate(queryParams.fromFilterDate);
    }

    if (queryParams.toFilterDate) {
      releaseNoteDateIsSameOrBeforeToFilterDate =
        new Date(releaseNote.isoDate) <= parseIsoDate(queryParams.toFilterDate);
    }

    if (queryParams.filterTopics && Array.isArray(queryParams.filterTopics)) {
      foundTopicInFilter = releaseNote.topics.find((topic) =>
        queryParams.filterTopics.includes(topic)
      );
    } else if (queryParams.filterTopics) {
      foundTopicInFilter = releaseNote.topics.find(
        (topic) => queryParams.filterTopics === topic
      );
    }

    return (
      releaseNoteDateIsSameOrAfterFromFilterDate &&
      releaseNoteDateIsSameOrBeforeToFilterDate &&
      foundTopicInFilter
    );
  });
};

export default useFilteredReleaseNotes;
