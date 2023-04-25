import { OrderedCoursesInfo } from '../hooks/use-course-pages';
import { getNextUnfinishedCoursePath } from './course-complete-modal';

const courseInfoMock1 = [
  {
    courseId: 66,
    pages: [
      { path: '/66/overview' },
      { path: '/66/quiz' },
      { path: '/66/2-quiz' },
    ],
    status: 'inProgress',
  },
  {
    courseId: 67,
    pages: [
      { path: '/67/overview' },
      { path: '/67/quiz' },
      { path: '/67/2-quiz' },
    ],
    status: 'completed',
  },
  {
    courseId: 68,
    pages: [
      { path: '/68/overview' },
      { path: '/68/quiz' },
      { path: '/68/2-quiz' },
    ],
    status: '',
  },
];

const courseInfoMock2 = [
  {
    courseId: 66,
    pages: [
      { path: '/66/overview' },
      { path: '/66/quiz' },
      { path: '/66/2-quiz' },
    ],
    status: 'inProgress',
  },
  {
    courseId: 67,
    pages: [
      { path: '/67/overview' },
      { path: '/67/quiz' },
      { path: '/67/2-quiz' },
    ],
    status: 'completed',
  },
  {
    courseId: 68,
    pages: [
      { path: '/68/overview' },
      { path: '/68/quiz' },
      { path: '/68/2-quiz' },
    ],
    status: 'completed',
  },
];

const courseInfoMock3 = [
  {
    courseId: 66,
    pages: [
      { path: '/66/overview' },
      { path: '/66/quiz' },
      { path: '/66/2-quiz' },
    ],
    status: 'completed',
  },
  {
    courseId: 67,
    pages: [
      { path: '/67/overview' },
      { path: '/67/quiz' },
      { path: '/67/2-quiz' },
    ],
    status: 'completed',
  },
  {
    courseId: 68,
    pages: [
      { path: '/68/overview' },
      { path: '/68/quiz' },
      { path: '/68/2-quiz' },
    ],
    status: 'completed',
  },
];

const courseInfoMock4 = [
  {
    courseId: 66,
    pages: [
      { path: '/66/overview' },
      { path: '/66/quiz' },
      { path: '/66/2-quiz' },
    ],
    status: 'completed',
  },
];

const cases = [
  [courseInfoMock1, 67, '/68/overview'],
  [courseInfoMock2, 67, '/66/overview'],
  [courseInfoMock3, 68, '/'],
  [courseInfoMock4, 66, '/'],
];

describe('isTestUserEmail', () => {
  test.each(cases)(
    'given %p and %p as argument, returns %p',
    (firstArg, secondArg, expectedResult) => {
      const result = getNextUnfinishedCoursePath(
        firstArg as OrderedCoursesInfo[],
        secondArg as number
      );
      expect(result).toEqual(expectedResult as string);
    }
  );
});
