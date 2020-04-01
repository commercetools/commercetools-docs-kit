import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

const ReleaseNote = (props) => {
  return <p>{props.data.mdx.fields.title}</p>;
};
ReleaseNote.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReleaseNote;

export const query = graphql`
  query QueryReleaseNotePage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        title
      }
      body
    }
  }
`;
