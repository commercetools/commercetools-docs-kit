import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { CheckActiveIcon } from '@commercetools-uikit/icons';
import SignpostIcon from '../icons/signpost.svg';

const SectionWrapper = styled.div`
  padding-top: ${designSystem.dimensions.spacings.xxl};
  padding-bottom: ${designSystem.dimensions.spacings.xxl};
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

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    flex-direction: row;
  }
`;

const ColumnList = styled.div`
  color: ${designSystem.colors.light.textInverted};
  flex-basis: 60%;
  padding-left: ${designSystem.dimensions.spacings.s};
  padding-right: ${designSystem.dimensions.spacings.s};
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const ColumnImage = styled.div`
  align-self: center;
  text-align: right;
  flex-basis: 40%;
  svg {
    height: 280px;
    width: 280px;
  }
  margin-top: ${designSystem.dimensions.spacings.xl};
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    margin-top: 0;

    flex-direction: row;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${designSystem.typography.fontSizes.h3};
  font-weight: 500;
  color: ${designSystem.colors.light.textInverted};
  text-align: center;
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    margin-top: 0;

    text-align: left;
  }
`;

const ListItemWrapper = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${designSystem.typography.lineHeights.body};
  a {
    color: ${designSystem.colors.light.textInverted};
    :hover {
      color: ${designSystem.colors.light.textInverted};
    }
  }
  display: flex;
`;
const IconContainer = styled.div`
  min-width: 35px;
`;

const TextContainer = styled.div``;

const ResourcesSection = () => {
  return (
    <SectionWrapper>
      <TwoColumnsWrapper>
        <ColumnList>
          <SpacingsStack scale="m">
            <SectionTitle>More learning resources</SectionTitle>
            <ListItemWrapper>
              <IconContainer>
                <CheckActiveIcon color="surface" />
              </IconContainer>
              <TextContainer>
                <p>
                  <a href=".">Instructor-led training</a>
                </p>
                <p>
                  Join introductory, functional, or developer courses based on
                  your needs.
                </p>
              </TextContainer>
            </ListItemWrapper>
            <ListItemWrapper>
              <IconContainer>
                <CheckActiveIcon color="surface" />
              </IconContainer>
              <TextContainer>
                <p>
                  <a href=".">Exam preparation courses</a>
                </p>
                <p>
                  Prepare for your commercetools certification exam and test
                  your readiness.
                </p>
              </TextContainer>
            </ListItemWrapper>
            <ListItemWrapper>
              <IconContainer>
                <CheckActiveIcon color="surface" />
              </IconContainer>
              <TextContainer>
                <p>
                  <a href=".">Documentation</a>
                </p>
                <p>
                  Explore an array of resources including user guides, code
                  samples, SDKs, tutorials, API & CLI references, and more.
                </p>
              </TextContainer>
            </ListItemWrapper>
            <ListItemWrapper>
              <IconContainer>
                <CheckActiveIcon color="surface" />
              </IconContainer>
              <TextContainer>
                <p>
                  <a href=".">Foundry</a>
                </p>
                <p>
                  Go live in weeks with a pre-composed solution and a complete
                  set of tailored resources, best practices, and AI tools.
                </p>
              </TextContainer>
            </ListItemWrapper>
          </SpacingsStack>
        </ColumnList>
        <ColumnImage>
          <SignpostIcon />
        </ColumnImage>
      </TwoColumnsWrapper>
    </SectionWrapper>
  );
};

export default ResourcesSection;
