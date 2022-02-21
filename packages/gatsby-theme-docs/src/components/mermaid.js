import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

// This is a client-side only implementation of mermaid, which is its primary development target.
// https://www.gatsbyjs.com/docs/using-client-side-only-packages/
// Server side rendering mermaid diagrams is technically possible
// and some remark and gatsby plugins do it. But all are badly maintained
// and the server side rendering use case is not covered in the mermaid documentation,
// which makes it a hard to maintain architecture.
// server side rendering also has the disadvantage that clickable elements cannot
// work because this requires attaching event handlers.

const MermaidLazy = React.lazy(() => import('./mermaid-client-side'));
const Mermaid = ({ graph }) => {
  const isClientSide = typeof window !== 'undefined';
  return (
    <>
      {isClientSide && (
        <React.Suspense
          fallback={<LoadingSpinner size="l" maxDelayDuration={500} />}
        >
          <MermaidLazy graph={graph} />
        </React.Suspense>
      )}
    </>
  );
};
Mermaid.propTypes = {
  graph: PropTypes.string.isRequired,
};

export default Mermaid;
