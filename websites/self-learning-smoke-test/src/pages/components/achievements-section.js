import { useState } from 'react';
import { designSystem } from '@commercetools-docs/ui-kit';
import { CopyIcon, InfoIcon } from '@commercetools-uikit/icons';
import Card from '@commercetools-uikit/card';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Spacings from '@commercetools-uikit/spacings';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Tooltip from '@commercetools-uikit/tooltip';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Stamp from '@commercetools-uikit/stamp';

const SectionTitle = styled.h3`
  font-size: ${designSystem.typography.fontSizes.h3};
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
`;

const AchivementContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    flex-wrap: nowrap;
  }
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;
const BadgeContainer = styled.div`
  order: 1;
  width: 100px;
  display: flex;
  align-items: center;
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    order: 2;
    padding-bottom: ${designSystem.dimensions.spacings.l};
    padding-top: ${designSystem.dimensions.spacings.l};
  }
`;

const InfoContainer = styled.div`
  order: 2;
  margin-left: ${designSystem.dimensions.spacings.xl};
  flex: 1;
  display: flex;
  min-width: 320px;
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    order: 1;

    min-width: 0;
    margin-left: 0;
  }
`;

const ActionContainer = styled.div`
  order: 3;
  width: fit-content;
  padding-top: 0;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    padding-top: ${designSystem.dimensions.spacings.l};
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    width: 300px;
    padding-top: 0;
  }
  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    flex-wrap: nowrap;
    padding-top: 0;
  }
  text-align: right;
`;

const InfoButtonWrapper = styled.div`
  svg {
    :hover {
      cursor: pointer;
    }
  }
`;

const TextWrapper = styled.h4`
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: 500;
  color: #227770;
  div {
    vertical-align: middle;
  }
`;

const MiniLink = styled.div`
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${designSystem.colors.light.link};
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  svg {
    vertical-align: bottom;
  }
`;

const AchievementsSection = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleFunction = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <SectionWrapper>
      <SpacingsStack scale="l">
        <SectionTitle>Your achievements</SectionTitle>
        <p>
          Take a look at your badges and check the status of your
          certifications. Remember, you need to refresh your knowledge every
          year.
        </p>
        <CollapsiblePanel
          isClosed={!isExpanded}
          header="Your certifications"
          onToggle={() => toggleFunction()}
        >
          <SpacingsStack scale="m">
            <Card type="raised">
              <AchivementContainer>
                <BadgeContainer>
                  <img
                    alt="Badge"
                    src={`https://learn.commercetools.com/pluginfile.php/1/badges/badgeimage/26/f3`}
                  />
                </BadgeContainer>
                <InfoContainer>
                  <SpacingsStack scale="l">
                    <TextWrapper>
                      Composable Commerce Functional Architect{' '}
                      <Stamp label="2021" tone="warning" isCondensed />
                    </TextWrapper>
                    <Spacings.Inline scale="s">
                      <p>
                        To keep your certification up to date, you need to pass
                        the certification renewal exam by the end of October
                        2024.
                      </p>
                      <InfoButtonWrapper>
                        <Tooltip
                          placement="top"
                          title="Certification renewal exams are instrumental in ensuring that your skills, knowledge, and certifications remain up to date."
                        >
                          <InfoIcon color="primary" />
                        </Tooltip>
                      </InfoButtonWrapper>
                    </Spacings.Inline>

                    <MiniLink>
                      Copy shareable link{' '}
                      <CopyIcon size="medium" color="primary"></CopyIcon>
                    </MiniLink>
                  </SpacingsStack>
                </InfoContainer>
                <ActionContainer>
                  <PrimaryButton label="Renew your certification" />
                </ActionContainer>
              </AchivementContainer>
            </Card>
            <Card type="raised">
              <AchivementContainer>
                <BadgeContainer>
                  <img
                    alt="Badge"
                    src={`https://learn.commercetools.com/pluginfile.php/1/badges/badgeimage/26/f3`}
                  />
                </BadgeContainer>
                <InfoContainer>
                  <SpacingsStack scale="m">
                    <TextWrapper>
                      Composable Commerce Functional Architect{' '}
                      <Stamp label="2021" tone="warning" isCondensed />
                    </TextWrapper>
                    <Spacings.Inline scale="s">
                      <p>
                        To keep your certification up to date, you need to pass
                        the certification renewal exam by the end of October
                        2024.
                      </p>
                      <InfoButtonWrapper>
                        <Tooltip
                          placement="top"
                          title="Certification renewal exams are instrumental in ensuring that your skills, knowledge, and certifications remain up to date."
                        >
                          <InfoIcon color="primary" />
                        </Tooltip>
                      </InfoButtonWrapper>
                    </Spacings.Inline>

                    <MiniLink>
                      Copy shareable link{' '}
                      <CopyIcon size="medium" color="primary"></CopyIcon>
                    </MiniLink>
                  </SpacingsStack>
                </InfoContainer>
                <ActionContainer>
                  <PrimaryButton label="Renew your certification" />
                </ActionContainer>
              </AchivementContainer>
            </Card>
          </SpacingsStack>
        </CollapsiblePanel>
      </SpacingsStack>
    </SectionWrapper>
  );
};

export default AchievementsSection;
