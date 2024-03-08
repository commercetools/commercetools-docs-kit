import { LordIcon, designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

const SectionTitle = styled.h3`
  font-size: ${designSystem.typography.fontSizes.h3};
  text-align: center;
  font-weight: 500;
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
  display: none;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: block;
  }
`;

const ThreeColumnsWrapper = styled.div`
  display: none;
  flex-wrap: column;
  flex-direction: column;
  align-items: center;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: flex;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    flex-direction: row;
    align-items: start;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  align-items: flex-start;
  width: 100%;
  text-align: left;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: auto;
    text-align: center;
  }
`;

const ColumnContent = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextContent = styled.div`
  padding-top: 10px;
  margin-left: 40px;

  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    margin-left: 0;
  }
`;

const ItemTitle = styled.h6`
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: 500;
  padding-bottom: 10px;
`;

const AchieveGoalsSection = () => {
  return (
    <SectionWrapper>
      <SpacingsStack scale="l">
        <SectionTitle>Achieve your goals</SectionTitle>
        <ThreeColumnsWrapper>
          <Column>
            <ColumnContent>
              <LordIcon
                iconName="programming-book"
                height="80"
                width="80"
                trigger="hover"
              />
              <TextContent>
                <ItemTitle>Elevate your learning</ItemTitle>
                <p>
                  Discover the full potential of commercetools products through
                  self-paced learning.
                </p>
              </TextContent>
            </ColumnContent>
          </Column>
          <Column>
            <ColumnContent>
              <LordIcon
                iconName="bookshelf"
                height="80"
                width="80"
                trigger="hover"
              />
              <TextContent>
                <ItemTitle>Refresh and test your knowledge</ItemTitle>
                <p>
                  Our quizzes help you to identify knowledge gaps, boost
                  confidence, and help retain information.
                </p>
              </TextContent>
            </ColumnContent>
          </Column>
          <Column>
            <ColumnContent>
              <LordIcon
                iconName="questionnaire"
                height="80"
                width="80"
                trigger="hover"
              />
              <TextContent>
                <ItemTitle>Prepare for exams</ItemTitle>
                <p>
                  Revise on your own terms and focus on key topics to breeze
                  through those exam prep courses and certification exams.
                </p>
              </TextContent>
            </ColumnContent>
          </Column>
        </ThreeColumnsWrapper>
      </SpacingsStack>
    </SectionWrapper>
  );
};

export default AchieveGoalsSection;
