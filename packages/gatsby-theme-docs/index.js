import CourseCard from './src/modules/self-learning/components/course-card';

export { default as LayoutApplication } from './src/layouts/internals/layout-application';
export { default as LayoutSidebar } from './src/layouts/internals/layout-sidebar';
export { default as LayoutHeader } from './src/layouts/internals/layout-header';
export { default as LayoutPage } from './src/layouts/internals/layout-page';
export { default as Footer } from './src/layouts/internals/footer';
export {
  BetaTag,
  ErrorBoundary,
  ExternalSiteLink,
  FullWidthContainer,
  Link,
  Overlay,
  SEO,
  SideBySide,
  TopMenu,
  ThemeProvider,
  PageRedirection,
} from './src/components';
export * from './src/hooks/use-site-data';
export * from './src/hooks/use-page-data';
export { default as CourseCard } from './src/modules/self-learning/components/course-card';
export { default as LearningPathCard } from './src/modules/self-learning/components/learning-path-card';
export { default as LearningPathCardHome } from './src/modules/self-learning/components/learning-path-card-home';
export { default as RefresherCard } from './src/modules/self-learning/components/refresher-card';
export { default as ImageCard } from './src/modules/self-learning/components/image-card';
export { default as FirstName } from './src/modules/self-learning/components/first-name';
export * from './src/modules/self-learning/hooks/use-learning-path-info';
export * from './src/modules/self-learning/hooks/use-course-status';

export { default as useAuthentication } from './src/modules/sso/hooks/use-authentication';
export {
  IfLearningPathComplete,
  IfLearningPathNotComplete,
} from './src/modules/self-learning/components/if-learning-path';
export {
  IfUserLoggedIn,
  IfUserLoggedOut,
} from './src/modules/self-learning/components/if-user-logged';
export { default as LoginButton } from './src/modules/sso/components/login-button';
export * from './src/modules/ai-assistant';
