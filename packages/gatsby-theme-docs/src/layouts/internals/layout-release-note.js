import React from 'react';
import PropTypes from 'prop-types';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { Markdown, designSystem } from '@commercetools-docs/ui-kit';

const ReleaseNoteTitle = Markdown.withAnchorLink(Markdown.H3);
const DateElement = styled.div`
  line-height: 16px;
`;
const Type = styled.p`
  display: inline-block;
  padding: ${designSystem.dimensions.spacings.xs}
    ${designSystem.dimensions.spacings.s};
  font-size: 12px;
  line-height: 16px;
  border: 1px solid #00ccb4;
  border-radius: 2px;
  background-color: #b3fff6;
  text-transform: capitalize;
`;

const Topics = styled.tr`
  color: #078cdf;
  font-size: 14px;
  td {
    padding: 4px;
  }
  td:first-of-type {
    padding-left: 0;
  }
  td:not(:first-of-type) {
    border-left: 1px solid #999;
  }
`;

const ReleaseNote = (props) => {
  return (
    <SpacingsStack scale="m">
      <ReleaseNoteTitle>{props.releaseNote.title}</ReleaseNoteTitle>
      <DateElement>{props.releaseNote.date}</DateElement>
      <div>
        <Type>{props.releaseNote.type.toLowerCase()}</Type>
      </div>
      {props.releaseNote.topics.length > 0 && (
        <div>
          <table>
            <tbody>
              <Topics>
                {props.releaseNote.topics.map((topic) => (
                  <td key={topic}>{topic}</td>
                ))}
              </Topics>
            </tbody>
          </table>
        </div>
      )}

      <div>
        <MDXRenderer>{props.releaseNote.body}</MDXRenderer>
      </div>
    </SpacingsStack>
  );
};
ReleaseNote.propTypes = {
  releaseNote: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReleaseNote;
