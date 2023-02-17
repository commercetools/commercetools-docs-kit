import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { designTokens } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import murmurhash from 'murmurhash';
import { colors, typography } from '../design-system';
import { cssVarToValue } from '../utils/css-variables';
import useScript from '../hooks/use-script';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

// This is a client-side only component.
// It loads the mermaid library externally from a CDN to prevent the big mermaid codbase
// from causing build performance issues although effectively just being passed through
// to client side processing anyways.
const mermaidVersion = '9.3';

// styling happens through a mix of the generic "themeVariables", diagram
// type specific settings and direct CSS classes for diagram types
// that are not using themeVariables yet. It seems there is no more consistent way to
// theme mermaid across diagram types - lots of legacy config.
const config = {
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'antiscript',
  arrowMarkerAbsolute: false,
  themeVariables: {
    // https://mermaid-js.github.io/mermaid/#/theming?id=theme-variables-reference-table
    background: cssVarToValue(colors.light.surfacePrimary),
    lineColor: cssVarToValue(colors.light.borderInfo),
    textColor: cssVarToValue(colors.light.textPrimary),
    fontFamily: typography.fontFamilies.primary,
    fontSize: typography.fontSizes.body,
    primaryColor: cssVarToValue(designTokens.colorInfo95),
    primaryBorderColor: cssVarToValue(designTokens.colorInfo),
    primaryTextColor: cssVarToValue(colors.light.textPrimary),

    secondaryColor: cssVarToValue(designTokens.colorAccent40),
    secondaryBorderColor: cssVarToValue(designTokens.colorAccent30),
    secondaryTextColor: cssVarToValue(colors.light.textPrimary),

    tertiaryColor: cssVarToValue(designTokens.colorPrimary95),
    tertiaryBorderColor: cssVarToValue(designTokens.colorPrimary25),
    tertiaryTextColor: cssVarToValue(colors.light.textPrimary),

    // notes are conventionally yellow but there is none in the design system
    noteBkgColor: 'lightyellow',
    noteTextColor: cssVarToValue(colors.light.textPrimary),
    noteBorderColor: 'yellow',

    errorBkgColor: cssVarToValue(colors.light.surfaceError),
    errorTextColor: cssVarToValue(colors.light.textError),

    // sequence diagram specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=sequence-diagram
    sequenceNumberColor: cssVarToValue(colors.light.textInverted),
    actorLineColor: cssVarToValue(colors.light.borderInfo),

    // flow chart specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=flowchart
    edgeLabelBackground: cssVarToValue(colors.light.surfaceSecondary1),
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'cardinal',
  },
  sequence: {
    // https://mermaid-js.github.io/mermaid/#/sequenceDiagram?id=possible-configuration-parameters
    fontFamily: typography.fontFamilies.primary,
    mirrorActors: false,
    useMaxWidth: true,
    rightAngles: false,
    showSequenceNumbers: true,
    diagramMarginX: 5, // prevent border clipping
    diagramMarginY: 5, // prevent border clippings
    bottomMarginAdj: 2,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,

    actorFontSize: typography.fontSizes.body,
    actorFontWeight: typography.fontWeights.regular,
    messageFontSize: typography.fontSizes.body,
    messageFontFamily: typography.fontFamilies.primary,
    messageFontWeight: typography.fontWeights.regular,
    noteFontSize: typography.fontSizes.small,
  },
  gantt: {
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
    fontFamily: typography.fontFamilies.primary,
  },
  // this low level CSS override is rather a bugfix workaround, resetting fill and stroke to fix font rendering.
  themeCSS: `
  .messageText {
    color: ${colors.light.textSecondary}
    fill: inherit;
    stroke: inherit;
  }
`,
} as const;

const Wrapper = styled.div`
  width: 100%;
  display: inherit;
  justify-content: center;
`;

const idForGraph = (graph: string) => `mermaid-${murmurhash.v3(graph)}`;

type MermaidProps = {
  graph: string;
};

const Mermaid = ({ graph }: MermaidProps) => {
  const [svg, setSvg] = useState('');
  const mermaidLoadStatus = useScript(
    `https://cdn.jsdelivr.net/npm/mermaid@${mermaidVersion}/dist/mermaid.min.js`
  );
  useEffect(() => {
    if (mermaidLoadStatus === 'ready') {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const mermaid = (window as any).mermaid;
      mermaid.initialize(config);
      mermaid.mermaidAPI.render(idForGraph(graph), graph, (svg: string) => {
        setSvg(svg);
      });
    }
  }, [graph, mermaidLoadStatus]);

  return (
    <>
      {mermaidLoadStatus === 'ready' ? (
        <Wrapper
          data-test-id="mermaid-diagram"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <LoadingSpinner scale="l" maxDelayDuration={0} />
      )}
    </>
  );
};
Mermaid.propTypes = {
  graph: PropTypes.string.isRequired,
};

export default Mermaid;
