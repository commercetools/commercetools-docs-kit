import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { LearningPathCard } from '@commercetools-docs/gatsby-theme-docs';
import LearningPathCardHome from '@commercetools-docs/gatsby-theme-docs/src/modules/self-learning/components/learning-path-card-home';
import config from './learning-path-home-config';

const Subtitle = styled.h4`
  color: ${designSystem.colors.light.textInverted};
  font-size: ${designSystem.typography.fontSizes.h5};
  font-weight: 400;
`;

const SectionWrapper = styled.div`
  padding-top: ${designSystem.dimensions.spacings.enormous};
  padding-bottom: ${designSystem.dimensions.spacings.l};
  a {
    color: ${designSystem.colors.light.link};
  }
  a:hover {
    color: ${designSystem.colors.light.linkHover};
  }
`;

const TwoColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
`;

const LearningPathsSection = () => {
  const SectionTitle = styled.h3`
    font-size: ${designSystem.typography.fontSizes.h3};
    text-align: center;
    font-weight: 500;
    color: ${designSystem.colors.light.textInverted};
  `;

  return (
    <SectionWrapper>
      <SpacingsStack scale="l">
        <SectionTitle>Learning paths</SectionTitle>
        <Subtitle>
          Discover the future of commerce with our carefully crafted learning
          paths. Dive deep into commercetools products and watch your expertise
          grow.
        </Subtitle>
        <TwoColumnsWrapper>
          {config.learningPaths.map((path) => (
            <Column key={path.id}>
              <LearningPathCardHome
                duration={path.duration}
                productName={path.product}
                title={path.title}
                href={path.href}
                icon={path.icon}
              >
                {path.description}
              </LearningPathCardHome>
            </Column>
          ))}
        </TwoColumnsWrapper>
      </SpacingsStack>
    </SectionWrapper>
  );
};

export default LearningPathsSection;
