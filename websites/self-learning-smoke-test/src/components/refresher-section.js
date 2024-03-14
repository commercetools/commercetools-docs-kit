import CertificationBox from './certification-box';
import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Link } from 'gatsby';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { useState } from 'react';
import PrizeIcon from '../icons/prize-icon.svg';
import { Cards } from '@commercetools-docs/gatsby-theme-docs/src/components';
import { RefresherCard } from '@commercetools-docs/gatsby-theme-docs';

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
        <Subtitle>
          Keep your knowledge and certifications up to date Headline One
        </Subtitle>
        <p>
          Get up to speed with last year’s most important enhancements to
          commercetools products by completing our refresher learning modules.
          Then, if you are certified already, take the free renewal exam to keep
          your certification status alive.
        </p>
        <Cards>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
          <RefresherCard
            title="Composable Commerce Functional Architect Refresher"
            productName="Composable Commerce"
          >
            Revise the key improvements to Composable Commerce during 2023 and
            prepare for your renewal exam.
          </RefresherCard>
        </Cards>
      </SpacingsStack>
    </SectionWrapper>
  );
};

export default CertificationsSection;
