const sortProperties = require('./sort-properties');

describe('sort properties to top, bottom or top and bottom of the properties array', () => {
  const properties = [
    { name: 'eigthProperty' },
    { name: 'createdBy' },
    { name: 'key' },
    { name: 'tenthProperty' },
    { name: 'custom' },
    { name: 'eleventhProperty' },
    { name: 'id' },
    { name: 'twelthProperty' },
    { name: 'lastModifiedBy' },
    { name: 'thirteenthProperty' },
    { name: 'lastModifiedAt' },
    { name: 'fourteenthProperty' },
    { name: 'fifteenthProperty' },
    { name: 'createdAt' },
    { name: 'version' },
  ];

  it('sort properties to the top of the array', () => {
    const moveToTop = [
      'id',
      'version',
      'key',
      'createdAt',
      'createdBy',
      'lastModifiedAt',
      'lastModifiedBy',
    ];
    const sortedPropertiesToTop = [
      { name: 'id' },
      { name: 'version' },
      { name: 'key' },
      { name: 'createdAt' },
      { name: 'createdBy' },
      { name: 'lastModifiedAt' },
      { name: 'lastModifiedBy' },
      { name: 'eigthProperty' },
      { name: 'tenthProperty' },
      { name: 'custom' },
      { name: 'eleventhProperty' },
      { name: 'twelthProperty' },
      { name: 'thirteenthProperty' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
    ];

    expect(sortProperties({ properties, moveToTop })).toEqual(
      sortedPropertiesToTop
    );
  });

  it('sort properties to the bottom of the array', () => {
    const moveToBottom = ['custom'];
    const sortedPropertiesToBottom = [
      { name: 'eigthProperty' },
      { name: 'createdBy' },
      { name: 'key' },
      { name: 'tenthProperty' },
      { name: 'eleventhProperty' },
      { name: 'id' },
      { name: 'twelthProperty' },
      { name: 'lastModifiedBy' },
      { name: 'thirteenthProperty' },
      { name: 'lastModifiedAt' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
      { name: 'createdAt' },
      { name: 'version' },
      { name: 'custom' },
    ];

    expect(sortProperties({ properties, moveToBottom })).toEqual(
      sortedPropertiesToBottom
    );
  });

  it('sort properties to the top and bottom of the array', () => {
    const moveToTop = [
      'id',
      'version',
      'key',
      'createdAt',
      'createdBy',
      'lastModifiedAt',
      'lastModifiedBy',
    ];
    const moveToBottom = ['custom'];
    const sortedPropertiesToTop = [
      { name: 'id' },
      { name: 'version' },
      { name: 'key' },
      { name: 'createdAt' },
      { name: 'createdBy' },
      { name: 'lastModifiedAt' },
      { name: 'lastModifiedBy' },
      { name: 'eigthProperty' },
      { name: 'tenthProperty' },
      { name: 'eleventhProperty' },
      { name: 'twelthProperty' },
      { name: 'thirteenthProperty' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
      { name: 'custom' },
    ];

    expect(sortProperties({ properties, moveToTop, moveToBottom })).toEqual(
      sortedPropertiesToTop
    );
  });
});
