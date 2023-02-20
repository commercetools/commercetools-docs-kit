import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import styled from '@emotion/styled';
import { colors, dimensions, tokens } from '../design-system';

// This is a client-side rendering implementation of mermaid.
// Browser based rendering is mermaid's primary development target and the intended way to use it.
// Server side rendering mermaid diagrams is technically possible
// and some remark and gatsby plugins do it. But all are badly maintained
// and the server side rendering use case is not covered in the mermaid documentation,
// which makes it a hard to maintain architecture.
// server side rendering also has the disadvantage that clickable elements cannot
// work because this requires attaching event handlers.

// gatsby pattern documentation:
// https://www.gatsbyjs.com/docs/using-client-side-only-packages/

const MermaidLazy = React.lazy(() => import('./mermaid-client-side'));

type MermaidProps = {
  graph: string;
};

const Figure = styled.figure`
  background-color: ${colors.light.surfaceSecondary1};
  border-radius: ${tokens.borderRadiusForImageFrame};
  margin: 0;
  padding: ${dimensions.spacings.xs};
  display: flex;
  justify-content: center;
  line-height: normal;
  min-height: 32px;
  a span.nodeLabel {
    color: ${colors.light.link} !important;
    text-decoration: underline;
  }
`;

const Mermaid = (props: MermaidProps) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Figure>
      {isClient ? (
        <React.Suspense
          fallback={<LoadingSpinner scale="l" maxDelayDuration={0} />}
        >
          <MermaidLazy graph={props.graph} />
        </React.Suspense>
      ) : (
        <LoadingSpinner scale="l" maxDelayDuration={0} />
      )}
    </Figure>
  );
};

export default Mermaid;
