import {
  SEO,
  ThemeProvider,
  useLearningPathsInfo,
  useAuthentication,
} from '@commercetools-docs/gatsby-theme-docs';
import LayoutLearningHome from '../layouts/learning-home';
import EnrolledLearningPaths from './components/enrolled-learning-paths';

const LEARNING_PATHS_TITLES = {
  86: { title: 'Administrator learning path' },
  87: { title: 'Developer learning path' },
};

const COURSES_INFO = {
  66: {
    title: 'Self-learning course 1',
    description:
      'Course description. Introduction to extensibility possibilities available in Composable Commerce.',
    duration: '30 min',
    href: 'course-1/overview',
  },
  69: {
    title: 'Self-learning course 2',
    description:
      '**This is a course with markdown description** _some italics text here_',
    duration: '30 min',
    href: 'course-2/overview',
  },
};

const PageLearningPathHomeContent = () => {
  const { isAuthenticated } = useAuthentication();
  const learningPathsInfo = useLearningPathsInfo(LEARNING_PATHS_TITLES);

  return (
    <div>
      <h1>Learning Path Home</h1>
      <p>This is the Learning Path Home page.</p>
      {isAuthenticated && learningPathsInfo && (
        <EnrolledLearningPaths
          learningPathsInfo={learningPathsInfo}
          coursesInfo={COURSES_INFO}
        ></EnrolledLearningPaths>
      )}
    </div>
  );
};

const PageLearningPathHomeTemplate = (props) => (
  <ThemeProvider>
    <LayoutLearningHome>
      <SEO
        title="commercetools Learning Paths"
        excludeFromSearchIndex={false}
      />
      <PageLearningPathHomeContent {...props} />
    </LayoutLearningHome>
  </ThemeProvider>
);

export default PageLearningPathHomeTemplate;
