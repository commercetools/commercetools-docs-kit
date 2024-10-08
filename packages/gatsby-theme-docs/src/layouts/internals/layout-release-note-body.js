import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Stamp from '@commercetools-uikit/stamp';
import { designSystem } from '@commercetools-docs/ui-kit';
import { useSiteData } from '../../hooks/use-site-data';

const DateElement = styled.div`
  line-height: ${designSystem.typography.lineHeights.small};
`;
const Topics = styled.div`
  color: ${designSystem.colors.light.textSearchHeading};
  font-size: ${designSystem.typography.fontSizes.small};

  > * + * {
    padding-left: ${designSystem.dimensions.spacings.xs};
    margin-left: ${designSystem.dimensions.spacings.xs};
    border-left: 1px solid ${designSystem.colors.light.surfaceSecondary3};
  }
`;

const CustomStamp = styled.div`
  height: 24px;
  color: ${designSystem.colors.light.selfLearningLoginButton};
  padding: 0 12px;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  border: 1px solid ${designSystem.colors.light.borderForReleaseNotesTag};
  border-radius: 20px;
  span {
    line-height: 24px;
    color: ${designSystem.colors.light.textPrimary};
  }
`;

const SeparatorLine = styled.div`
  height: ${designSystem.dimensions.heights.separatorLine};
  border-left: 1px solid ${designSystem.colors.light.surfaceSecondary3};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: none;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${designSystem.dimensions.spacings.s};
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    flex-direction: column;
    width: auto;
  }
`;

const ReleaseNoteBody = (props) => {
  // Using the siteMetadata to determine the product and productArea if the frontmatter is not defined.
  const siteData = useSiteData();
  const product =
    props.product ||
    ((siteData.siteMetadata.products?.[0] || '') !== ''
      ? siteData.siteMetadata.products[0]
      : null);
  const productArea = props.productArea || siteData.siteMetadata.title;
  const releaseNoteType = Array.isArray(props.type) ? props.type : [props.type];
  const hideProductLabels = props.hideProductLabels || false;

  return (
    <SpacingsStack scale="m">
      <SpacingsStack scale="s" alignItems="flex-start">
        <DateElement>{props.date}</DateElement>

        <TagsWrapper>
          {!hideProductLabels && (
            <>
              {product && (
                <CustomStamp>
                  <span>{product}</span>
                </CustomStamp>
              )}
              {/* If product and productArea have the same value, we only want to show it once. */}
              {productArea && productArea !== product && (
                <CustomStamp>
                  <span>{productArea}</span>
                </CustomStamp>
              )}
              <SeparatorLine />
            </>
          )}
          {releaseNoteType.map((type) => {
            return (
              <div
                key={type}
                style={designSystem.tokensToCssVars({
                  fontSizeDefault: designSystem.typography.fontSizes.extraSmall,
                  fontSizeForStamp:
                    designSystem.typography.fontSizes.extraSmall,
                  // Override the `critical` style which is used for the "fix" type
                  colorError95:
                    designSystem.colors.light.surfaceForReleaseNoteTypeFix,
                  colorError:
                    designSystem.colors.light.borderForReleaseNoteTypeFix,
                })}
              >
                <Stamp
                  isCondensed
                  tone={mapTypeToTone(type)}
                  label={mapTypeToLabel(type)}
                />
              </div>
            );
          })}
        </TagsWrapper>

        {props.topics.length > 0 && (
          <Topics>
            {props.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </Topics>
        )}
      </SpacingsStack>
      <div>{props.children}</div>
    </SpacingsStack>
  );
};

ReleaseNoteBody.propTypes = {
  date: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  type: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  product: PropTypes.string,
  productArea: PropTypes.string,
  hideProductLabels: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ReleaseNoteBody;

function mapTypeToTone(type) {
  switch (type) {
    case 'feature':
      return 'primary';
    case 'enhancement':
      return 'positive';
    case 'fix':
      return 'positive';
    case 'announcement':
      return 'information';
    case 'deprecation':
      return 'secondary';
    default:
      return type;
  }
}

function mapTypeToLabel(type) {
  switch (type) {
    case 'feature':
      return 'New feature';
    case 'enhancement':
      return 'Enhancement';
    case 'fix':
      return 'Resolved issue';
    case 'announcement':
      return 'Announcement';
    case 'deprecation':
      return 'Deprecation';
    default:
      return type;
  }
}
