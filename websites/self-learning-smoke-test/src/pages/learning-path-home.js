import {
  SEO,
  ThemeProvider,
  useLearningPathsInfo,
  useAuthentication,
} from '@commercetools-docs/gatsby-theme-docs';
import LayoutLearningHome from '../layouts/learning-home';
import EnrolledLearningPaths from './components/enrolled-learning-paths';
import FullWidthContainer from './components/full-width-container';
import styled from '@emotion/styled';
import WelcomeAreaLoggedIn from './components/welcome-area-logged-in';
import WelcomeAreaLoggedOut from './components/welcome-area-logged-out';
import CertificationsSection from './components/certifications-section';
import RefresherSection from './components/refresher-section';
import { designSystem } from '@commercetools-docs/ui-kit';
import AchieveGoalsSection from './components/achieve-goals-section';
import LearningPathsSection from './components/learning-paths-section';

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

const Container = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    width: 80%;
  }
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    width: 95%;
  }
  max-width: 1140px;
  margin: 0 auto;
`;

const PageLearningPathHomeContent = () => {
  const { isAuthenticated } = useAuthentication();
  const learningPathsInfo = useLearningPathsInfo(LEARNING_PATHS_TITLES);

  return (
    <Container>
      <ContentWrapper>
        {isAuthenticated ? <WelcomeAreaLoggedIn /> : <WelcomeAreaLoggedOut />}
        {isAuthenticated && learningPathsInfo && (
          <EnrolledLearningPaths
            learningPathsInfo={learningPathsInfo}
            coursesInfo={COURSES_INFO}
          ></EnrolledLearningPaths>
        )}
        {!isAuthenticated && <AchieveGoalsSection />}
      </ContentWrapper>
      <FullWidthContainer>
        <LearningPathsSection />
      </FullWidthContainer>
      <ContentWrapper>
        <CertificationsSection />
      </ContentWrapper>
      <ContentWrapper>
        <RefresherSection />
      </ContentWrapper>
    </Container>
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
