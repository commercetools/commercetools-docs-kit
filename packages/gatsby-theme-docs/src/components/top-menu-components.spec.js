import { sortItems } from './top-menu-components';

const items1 = [
  { label: 'APIs', items: [] },
  { href: '/views/empty', title: 'HTTP APIs' },
  { href: '/views/empty', title: 'HTTP APIs' },
  { title: 'Expandable 1', items: [{}, {}] },
];

const expectedItems1 = [
  { title: 'Expandable 1', items: [{}, {}] },
  { label: 'APIs', items: [] },
  { href: '/views/empty', title: 'HTTP APIs' },
  { href: '/views/empty', title: 'HTTP APIs' },
];

const items2 = [
  { title: 'Expandable 1', items: [{}, {}] },
  { title: 'Expandable 2', items: [{}, {}] },
];

const expectedItems2 = [
  { title: 'Expandable 1', items: [{}, {}] },
  { title: 'Expandable 2', items: [{}, {}] },
];

const items3 = [
  { href: '/views/empty', title: 'HTTP APIs' },
  { href: '/views/empty', title: 'HTTP APIs 2' },
];

const expectedItems3 = [
  { href: '/views/empty', title: 'HTTP APIs' },
  { href: '/views/empty', title: 'HTTP APIs 2' },
];

const items4 = [
  { href: '/views/empty', title: 'Direct Link 2' },
  { title: 'Expandable 1', items: [{}, {}] },
  { title: 'Expandable 3', items: [{}, {}] },
  { href: '/views/empty', title: 'Direct Link 1' },
  { title: 'Expandable 2', items: [{}, {}] },
];

const expectedItems4 = [
  { title: 'Expandable 1', items: [{}, {}] },
  { title: 'Expandable 3', items: [{}, {}] },
  { title: 'Expandable 2', items: [{}, {}] },
  { href: '/views/empty', title: 'Direct Link 2' },
  { href: '/views/empty', title: 'Direct Link 1' },
];

const items5 = [];

const expectedItems5 = [];

const cases = [
  [items1, expectedItems1],
  [items2, expectedItems2],
  [items3, expectedItems3],
  [items4, expectedItems4],
  [items5, expectedItems5],
];

describe('sortItems', () => {
  test.each(cases)(
    'given %p and %p as argument, returns %p',
    (firstArg, expectedResult) => {
      const result = sortItems(firstArg);
      expect(result).toEqual(expectedResult);
    }
  );
});
