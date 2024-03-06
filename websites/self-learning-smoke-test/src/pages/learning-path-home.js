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
  width: 80%;
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
      </ContentWrapper>
      <FullWidthContainer>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat
        nibh et elit mollis, nec tristique dui pharetra. Sed tempus quam eu quam
        tempus, a vulputate leo posuere. Vestibulum lacinia dapibus leo eu
        convallis. Vestibulum gravida nisi ac pretium viverra. Quisque erat
        quam, mattis ac sodales quis, venenatis in nulla. Donec nec pulvinar
        mauris, nec sagittis ante. Ut id elit sodales, accumsan eros ut,
        pulvinar mi. Pellentesque in neque nulla. Donec ultrices urna mollis,
        convallis tellus vel, tempus orci. Vivamus tortor neque, gravida at erat
        eu, consequat elementum lacus. Quisque sed nulla sed velit cursus mauris
        quis diam rutrum varius. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Phasellus at ligula ut
        libero mattis cursus. Nunc vulputate arcu in ante imperdiet accumsan.
        Nullam pulvinar commodo magna, sit amet vehicula mauris consequat in.
        Curabitur auctor ipsum id diam mattis, a pretium odio finibus. Ut nunc
        libero, suscipit eget facilisis et, posuere vel est. Suspendisse non
        nisi felis. Nullam nec augue purus. Cras lacinia commodo fringilla. Cras
        eget est nec nibh rutrum feugiat vel eget nibh. Nulla non massa
        porttitor, hendrerit neque vitae, efficitur dui. Curabitur tempus
        vestibulum enim, a ullamcorper diam eleifend eu. Maecenas eleifend
        libero et posuere interdum. Etiam eget tincidunt augue. Integer Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat nibh et
        elit mollis, nec tristique dui pharetra. Sed tempus quam eu quam tempus,
        a vulputate leo posuere. Vestibulum lacinia dapibus leo eu convallis.
        Vestibulum gravida nisi ac pretium viverra. Quisque erat quam, mattis ac
        sodales quis, venenatis in nulla. Donec nec pulvinar mauris, nec
        sagittis ante. Ut id elit sodales, accumsan eros ut, pulvinar mi.
        Pellentesque in neque nulla. Donec ultrices urna mollis, convallis
        tellus vel, tempus orci. Vivamus tortor neque, gravida at erat eu,
        consequat elementum lacus. Quisque sed nulla sed velit cursus gravida at
        sit amet ante. Ut dictum est id mi efficitur luctus. Cras auctor, orci
        ut congue aliquet, eros sem eleifend purus, sit amet hendrerit massa
        nunc vel leo. Vestibulum vitae nisi eu erat efficitur finibus.
        Vestibulum efficitur, tellus eu maximus scelerisque, urna nunc
        sollicitudin orci, et egestas leo velit eget enim. Vestibulum eget
        mauris quis diam rutrum varius. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Phasellus at
        ligula ut libero mattis cursus. Nunc vulputate arcu in ante imperdiet
        accumsan. Nullam pulvinar commodo magna, sit amet vehicula mauris
        consequat in. Curabitur auctor ipsum id diam mattis, a pretium odio
        finibus. Ut nunc libero, suscipit eget facilisis et, posuere vel est.
        Suspendisse non nisi felis. Nullam nec augue purus. Cras lacinia commodo
        fringilla. Cras eget est nec nibh rutrum feugiat vel eget nibh. Nulla
        non massa porttitor, hendrerit neque vitae, efficitur dui. Curabitur
        tempus vestibulum enim, a ullamcorper diam eleifend eu. Maecenas
        eleifend libero et posuere interdum. Etiam eget tincidunt augue. Integer
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat
        nibh et elit mollis, nec tristique dui pharetra. Sed tempus quam eu quam
        tempus, a vulputate leo posuere. Vestibulum lacinia dapibus leo eu
        convallis. Vestibulum gravida nisi ac pretium viverra. Quisque erat
        quam, mattis ac sodales quis, venenatis in nulla. Donec nec pulvinar
        mauris, nec sagittis ante. Ut id elit sodales, accumsan eros ut,
        pulvinar mi. Pellentesque in neque nulla. Donec ultrices urna mollis,
        convallis tellus vel, tempus orci. Vivamus tortor neque, gravida at erat
        eu, consequat elementum lacus. Quisque sed nulla sed velit cursus
        gravida at sit amet ante. Ut dictum est id mi efficitur luctus. Cras
        auctor, orci ut congue aliquet, eros sem eleifend purus, sit amet
        hendrerit massa nunc vel leo. Vestibulum vitae nisi eu erat efficitur
        finibus. Vestibulum efficitur, tellus eu maximus scelerisque, urna nunc
        sollicitudin orci, et egestas leo velit eget enim. Vestibulum eget
        mauris quis diam rutrum varius. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Phasellus at
        ligula ut libero mattis cursus. Nunc vulputate arcu in ante imperdiet
        accumsan. Nullam pulvinar commodo magna, sit amet vehicula mauris
        consequat in. Curabitur auctor ipsum id diam mattis, a pretium odio
        finibus. Ut nunc libero, suscipit eget facilisis et, posuere vel est.
        Suspendisse non nisi felis. Nullam nec augue purus. Cras lacinia commodo
        fringilla. Cras eget est nec nibh rutrum feugiat vel eget nibh. Nulla
        non massa porttitor, hendrerit neque vitae, efficitur dui. Curabitur
        tempus vestibulum enim, a ullamcorper diam eleifend eu. Maecenas
        eleifend libero et posuere interdum. Etiam eget tincidunt augue. Integer
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
