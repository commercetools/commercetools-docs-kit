import { transformData } from './rss-feeds';

describe('transformData', () => {
  const data = createTestData();
  const transformedData = transformData(data);

  it('should limit the items with the newest of the oldest feed dates', () => {
    expect(transformedData[transformedData.length - 1].pubDate).toBe(
      'Mon, 19 Oct 2020 00:00:00 GMT'
    );
  });
  it('should show only items with a newer date sorted', () => {
    expect(transformedData[0].pubDate).toBe('Mon, 02 Nov 2020 00:00:00 GMT');
    expect(transformedData[1].pubDate).toBe('Sun, 01 Nov 2020 00:00:00 GMT');
    expect(transformedData[2].pubDate).toBe('Tue, 29 Oct 2020 00:00:00 GMT');
    expect(transformedData[3].pubDate).toBe('Fri, 23 Oct 2020 00:00:00 GMT');
    expect(transformedData[4].pubDate).toBe('Mon, 19 Oct 2020 00:00:00 GMT');
  });
});

function createTestData() {
  return [
    [
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Mon, 02 Nov 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
      },
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Sun, 01 Nov 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
      },
      {
        feedName: 'HTTP API',
        title: 'description',
        pubDate: 'Mon, 19 Oct 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/api/releases',
      },
    ],
    [
      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Fri, 23 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
      },
      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Tue, 06 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
      },
      {
        feedName: 'Merchant Center',
        title: 'description',
        pubDate: 'Tue, 08 Sep 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/merchant-center/releases',
      },
    ],
    [
      {
        feedName: 'Custom Applications',
        title: 'description',
        pubDate: 'Tue, 29 Oct 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/custom-applications/releases',
      },
      {
        feedName: 'Custom Applications',
        title: 'description',
        pubDate: 'Fri, 25 Sep 2020 00:00:00 GMT',
        releaseNoteUrl:
          'https://docs.commercetools.com/custom-applications/releases',
      },
    ],
    [
      {
        feedName: 'Import API',
        title: 'description',
        pubDate: 'Mon, 07 Sep 2020 00:00:00 GMT',
        releaseNoteUrl: 'https://docs.commercetools.com/import-api/releases',
      },
    ],
  ];
}
