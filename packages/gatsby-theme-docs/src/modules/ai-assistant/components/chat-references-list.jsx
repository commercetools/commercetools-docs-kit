import styled from '@emotion/styled';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { createReferenceGroup } from './chat.utils';

const ReferenceContainer = styled.div`
  height: fit-content;
  width: 100%;
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.borderPrimary};
  border-radius: 4px;
  padding: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.small};

  h4 {
    font-weight: ${designSystem.typography.fontWeights['light-bold']};
    line-height: ${designSystem.typography.lineHeights.body};
  }

  ul {
    margin-left: 20px !important;
    overflow-wrap: break-word;

    li {
      padding: 4px 0;
    }
  }

  a {
    color: ${designSystem.colors.light.textPrimary};
  }
`;

const ReferenceGroupTitle = styled.p`
  padding-top: 16px;
  font-style: italic;
`;

const ReferenceSubList = (props) => {
  const titleProp = props.titleProp || 'title';
  const sortedReferences = {};

  props.references.forEach((reference) => {
    const formattedMicrositeName = reference.microsite
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });

    const group = createReferenceGroup(reference.micrositeBreadcrumb, formattedMicrositeName);
    if (sortedReferences[group]) {
      sortedReferences[group].push(reference);
    } else {
      sortedReferences[group] = [reference];
    }
  });

  return props.references.length > 0 ? (
    <div>
      {props.title && <p>{props.title}</p>}
      {Object.keys(sortedReferences).map((reference, index) => (
        <div key={index}>
          <ReferenceGroupTitle>{reference}</ReferenceGroupTitle>
          <ul>
            {sortedReferences[reference].map((reference, index) => (
              <li key={index}>
                <Link target="_blank" href={reference.url}>
                  {reference[titleProp]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : null;
};

ReferenceSubList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      contentType: PropTypes.string,
      url: PropTypes.string,
      urn: PropTypes.string,
      title: PropTypes.string,
      typeName: PropTypes.string,
      api: PropTypes.string,
      products: PropTypes.arrayOf(PropTypes.string),
      microsite: PropTypes.string,
      codeRemoved: PropTypes.bool,
      tokenCount: PropTypes.string,
      usedInSystemPrompt: PropTypes.boolean,
      similarityScore: PropTypes.number,
    })
  ).isRequired,
  title: PropTypes.string,
  titleProp: PropTypes.string,
};

const ReferencesList = (props) => {
  const referencesToDisplay = props.references.filter(
    (reference) => reference.usedInSystemPrompt && reference.url
  );
  return props.references.length > 0 ? (
    <ReferenceContainer>
      <SpacingsStack scale="s">
        <h4>Suggested resources</h4>
        <p>Please double-check the responses against the documentation:</p>
        <ReferenceSubList references={referencesToDisplay} />
      </SpacingsStack>
    </ReferenceContainer>
  ) : null;
};

ReferencesList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      contentType: PropTypes.string,
      url: PropTypes.string,
      urn: PropTypes.string,
      title: PropTypes.string,
      typeName: PropTypes.string,
      api: PropTypes.string,
      products: PropTypes.arrayOf(PropTypes.string),
      microsite: PropTypes.string,
      codeRemoved: PropTypes.bool,
      tokenCount: PropTypes.string,
      usedInSystemPrompt: PropTypes.boolean,
      similarityScore: PropTypes.number,
    })
  ).isRequired,
};

export default ReferencesList;
