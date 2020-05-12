import moment from 'moment';

function filterReleases(releases, filters) {
  if (filters.fromFilterDate || filters.toFilterDate || filters.filterTopics) {
    return releases.filter((releaseNote) => {
      let releaseNoteDateIsSameOrAfterFromFilterDate = true;
      let releaseNoteDateIsSameOrBeforeToFilterDate = true;
      let foundTopicInFilter = true;

      if (filters.fromFilterDate) {
        releaseNoteDateIsSameOrAfterFromFilterDate = moment(
          releaseNote.date,
          'D MMMM YYYY'
        ).isSameOrAfter(moment(filters.fromFilterDate, 'YYYY-MM-DD'));
      }

      if (filters.toFilterDate) {
        releaseNoteDateIsSameOrBeforeToFilterDate = moment(
          releaseNote.date,
          'D MMMM YYYY'
        ).isSameOrBefore(moment(filters.toFilterDate, 'YYYY-MM-DD'));
      }

      if (filters.filterTopics && Array.isArray(filters.filterTopics)) {
        foundTopicInFilter = releaseNote.topics.find((topic) =>
          filters.filterTopics.includes(topic)
        );
      } else if (filters.filterTopics) {
        foundTopicInFilter = releaseNote.topics.find(
          (topic) => filters.filterTopics === topic
        );
      }

      return (
        releaseNoteDateIsSameOrAfterFromFilterDate &&
        releaseNoteDateIsSameOrBeforeToFilterDate &&
        foundTopicInFilter
      );
    });
  }

  return releases;
}

export default filterReleases;
