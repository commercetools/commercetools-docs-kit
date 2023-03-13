import sortProperties from './sort-properties.mjs';

describe('sort properties in an array', () => {
  const properties = [
    { name: 'eigthProperty' },
    { name: 'createdBy' },
    { name: 'ninthProperty' },
    { name: 'key' },
    { name: 'tenthProperty' },
    { name: 'custom' },
    { name: 'eleventhProperty' },
    { name: 'fourteenthProperty' },
    { name: 'id' },
    { name: 'twelthProperty' },
    { name: 'lastModifiedBy' },
    { name: 'thirteenthProperty' },
    { name: 'lastModifiedAt' },
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
      { name: 'ninthProperty' },
      { name: 'tenthProperty' },
      { name: 'custom' },
      { name: 'eleventhProperty' },
      { name: 'fourteenthProperty' },
      { name: 'twelthProperty' },
      { name: 'thirteenthProperty' },
      { name: 'fifteenthProperty' },
    ];

    expect(sortProperties({ properties, moveToTop })).toEqual(
      sortedPropertiesToTop
    );
  });

  it('sort properties to the bottom of the array', () => {
    const moveToBottom = ['fourteenthProperty', 'fifteenthProperty', 'custom'];
    const sortedPropertiesToBottom = [
      { name: 'eigthProperty' },
      { name: 'createdBy' },
      { name: 'ninthProperty' },
      { name: 'key' },
      { name: 'tenthProperty' },
      { name: 'eleventhProperty' },
      { name: 'id' },
      { name: 'twelthProperty' },
      { name: 'lastModifiedBy' },
      { name: 'thirteenthProperty' },
      { name: 'lastModifiedAt' },
      { name: 'createdAt' },
      { name: 'version' },
      { name: 'fourteenthProperty' },
      { name: 'fifteenthProperty' },
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
    const moveToBottom = ['fourteenthProperty', 'fifteenthProperty', 'custom'];
    const sortedPropertiesToTop = [
      { name: 'id' },
      { name: 'version' },
      { name: 'key' },
      { name: 'createdAt' },
      { name: 'createdBy' },
      { name: 'lastModifiedAt' },
      { name: 'lastModifiedBy' },
      { name: 'eigthProperty' },
      { name: 'ninthProperty' },
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
