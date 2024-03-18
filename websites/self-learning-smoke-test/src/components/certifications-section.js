import CertificationBox from './certification-box';
import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Link } from 'gatsby';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { useState } from 'react';
import PrizeIcon from '../icons/prize-icon.svg';

const SectionTitle = styled.h3`
  font-size: ${designSystem.typography.fontSizes.h3};
  text-align: center;
  font-weight: 500;
`;

const Subtitle = styled.h4`
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: 700;
`;

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

const MobileWrapper = styled.div`
  display: block;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: none;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
`;

const OptionTitle = styled.h6`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const BulletList = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  ol {
    margin-top: 5px;
  }
  ul > li {
    margin-left: 20px;
    padding: 5px 0;
    list-style: disc;
  }
`;

const SomeRandomIcon = styled.div`
  padding-top: 30px;
`;

const CertificationsSection = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleFunction = (lpId) => {
    setExpandedItems((expandedItems) => {
      if (expandedItems.includes(lpId)) {
        return expandedItems.filter((id) => id !== lpId);
      } else {
        return [...expandedItems, lpId];
      }
    });
  };

  return (
    <SectionWrapper>
      <SpacingsStack scale="l">
        <SectionTitle>Certifications</SectionTitle>
        <Subtitle>Get Certified</Subtitle>
        <p>
          There are two paths to get certified. Choose the one that fits you the
          best. Learn more about{' '}
          <Link href=".">commercetools Certifications.</Link>
        </p>
        <MobileWrapper>
          <CollapsiblePanel
            isClosed={!expandedItems.includes('optionA')}
            header="Option A: instructor-led training"
            onToggle={() => toggleFunction('optionA')}
          >
            <BulletList>
              <ol>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
              </ol>
            </BulletList>
          </CollapsiblePanel>
          <CollapsiblePanel
            isClosed={!expandedItems.includes('optionB')}
            header="Option B: Exam prep course"
            onToggle={() => toggleFunction('optionB')}
          >
            <BulletList>
              <ol>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
                <li>
                  Professional experience
                  <ul>
                    <li>
                      Gain professional experience in working with
                      commerecetools. Explore self-learning to solidify your
                      knowledge.
                    </li>
                  </ul>
                </li>
              </ol>
            </BulletList>
          </CollapsiblePanel>
          <SomeRandomIcon>
            <PrizeIcon />
          </SomeRandomIcon>
        </MobileWrapper>
        <TwoColumnsWrapper>
          <Column>
            <SpacingsStack scale="m">
              <OptionTitle>OPTION A: Instructor-led training path</OptionTitle>
              <CertificationBox
                type="graduation"
                title="Instructor-led training"
                number={1}
              >
                Our 14-hour <a href=".">instructor-led training</a> will prepare
                you for a commercetools certification exam from scratch and test
                your readiness.
              </CertificationBox>
              <CertificationBox
                type="certified"
                title="Certification exam"
                number={2}
              >
                Demonstrate your commercetools knowledge and become a certified
                commercetools expert through our globally recognized online
                exam.
              </CertificationBox>
            </SpacingsStack>
          </Column>
          <Column>
            <SpacingsStack scale="m">
              <OptionTitle>OPTION B: Exam preparation course path</OptionTitle>

              <CertificationBox type="books" title="Self-study" number={1}>
                Work through our getting started and extensive self-study
                learning paths online. Complete the self-learning modules to
                solidify your knowledge.
              </CertificationBox>
              <CertificationBox
                type="graduation"
                title="Exam prep course"
                number={2}
              >
                Our 4.5-hour instructor-led exam prep courses prepare you for a
                commercetools certification exam and test your readiness.
              </CertificationBox>
              <CertificationBox
                type="certified"
                title="Certification exam"
                number={3}
              >
                Demonstrate your commercetools knowledge and become a certified
                commercetools expert through our globally recognized online
                exam.
              </CertificationBox>
            </SpacingsStack>
          </Column>
        </TwoColumnsWrapper>
      </SpacingsStack>
    </SectionWrapper>
  );
};

export default CertificationsSection;
