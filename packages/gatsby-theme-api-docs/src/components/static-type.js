import React from 'react';
import PropTypes from 'prop-types';
import { FullWidthContainer } from '@commercetools-docs/gatsby-theme-docs';
import loadable from '@loadable/component';

// https://loadable-components.com/docs/dynamic-import/
// https://dev.to/itmayziii/better-performance-using-dynamic-code-splitting-in-gatsby-with-loadable-components-6am
const ApiType = loadable((props) => {
  // https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
  // this catches some .raml files that are not yaml compatible and are hence throwing errors (api.raml)
  // TODO no data loaded
  // TODO despite excluding api.raml the console still has the errors
  const typeData = import(
    /* webpackInclude: /\.raml$/ */
    /* webpackExclude: /\api.raml$/ */
    // `/src/api-specs/test/types/AnyTestType.raml`
    `/src/api-specs/test/types/${props.type}.raml`
    // `/src/api-specs/${props.apiKey}/types/${props.type}.raml`
  );
  return (
    <FullWidthContainer>
      HERE BE JSON RAML
      <pre>{JSON.stringify(typeData)}</pre>
    </FullWidthContainer>
  );
});

ApiType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ApiType;
