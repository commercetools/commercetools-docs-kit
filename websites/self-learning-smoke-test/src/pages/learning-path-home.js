import {
  SEO,
  ThemeProvider,
  useAuthentication,
  useFetchBadges,
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
import AchievementsSection from './components/achievements-section';
import ResourcesSection from './components/resources-section';

const config = {
  learningPaths: [
    {
      id: 86,
      title: 'Administrator',
      description:
        'Tailored for administrators who create/maintain commerce data points, primarily work with a user interface, and have some familiarity with APIs.',
      duration: '20 hours  | 8 modules',
      product: 'Composable Commerce',
      href: 'learning-composable-commerce-administrator/organizations-and-projects/overview',
      icon: 'spreadsheet2',
      courses: [
        {
          id: 66,
          title: 'Organizations, Teams, and Projects',
          description:
            'Course description. Introduction to extensibility possibilities available in Composable Commerce.',
          duration: '30 min',
          href: 'course-1/overview',
        },
        {
          id: 69,
          title: 'Product data modeling',
          description:
            '**This is a course with markdown description** _some italics text here_',
          duration: '30 min',
          href: 'course-2/overview',
        },
      ],
    },
    {
      id: 85,
      title: 'Developer',
      description:
        'Tailored for developers with sound programming skills who create and maintain resources in their Composable Commerce Projects using one of the SDKs.',
      duration: '25 hours | 8 courses',
      product: 'Composable Commerce',
      href: 'learning-composable-commerce-administrator/organizations-and-projects/overview',
      icon: 'cli',
      courses: [
        {
          id: 55,
          title: 'Self-learning course 1',
          description:
            'Course description. Introduction to extensibility possibilities available in Composable Commerce.',
          duration: '30 min',
          href: 'course-1/overview',
        },
        {
          id: 70,
          title: 'Self-learning course 2',
          description:
            '**This is a course with markdown description** _some italics text here_',
          duration: '30 min',
          href: 'course-2/overview',
        },
      ],
    },
  ],
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

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
  border-top: 48px solid #4242b2;
`;

const TriangleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageLearningPathHomeContent = () => {
  const { isAuthenticated } = useAuthentication();
  const { data: badgesData } = useFetchBadges();

  return (
    <Container>
      <ContentWrapper>
        {isAuthenticated ? <WelcomeAreaLoggedIn /> : <WelcomeAreaLoggedOut />}
        {isAuthenticated && <EnrolledLearningPaths />}
        {isAuthenticated && badgesData?.result?.badges && (
          <AchievementsSection badges={badgesData.result.badges} />
        )}
        {!isAuthenticated && <AchieveGoalsSection />}
      </ContentWrapper>
      <FullWidthContainer>
        {config && <LearningPathsSection cfg={config} />}
      </FullWidthContainer>
      <ContentWrapper>
        <TriangleWrapper>
          <Triangle />
        </TriangleWrapper>
        <CertificationsSection />
      </ContentWrapper>
      <ContentWrapper>
        <RefresherSection />
      </ContentWrapper>
      <FullWidthContainer nograss={true}>
        <ResourcesSection />
      </FullWidthContainer>
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
