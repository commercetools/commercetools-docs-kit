import moment from 'moment';
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
      releaseNoteDateIsSameOrAfterFromFilterDate = moment(
        releaseNote.date,
        'D MMMM YYYY'
      ).isSameOrAfter(moment(queryParams.fromFilterDate, 'YYYY-MM-DD'));
    }

    if (queryParams.toFilterDate) {
      releaseNoteDateIsSameOrBeforeToFilterDate = moment(
        releaseNote.date,
        'D MMMM YYYY'
      ).isSameOrBefore(moment(queryParams.toFilterDate, 'YYYY-MM-DD'));
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
