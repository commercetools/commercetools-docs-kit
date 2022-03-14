import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mermaid from 'mermaid';
import { designSystem } from '@commercetools-docs/ui-kit';
import { customProperties } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import murmurhash from 'murmurhash';

// This is a client-side only component.

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
    background: designSystem.colors.light.surfacePrimary,
    lineColor: designSystem.colors.light.borderInfo,
    textColor: designSystem.colors.light.textPrimary,
    fontFamily: designSystem.typography.fontFamilies.primary,
    fontSize: designSystem.typography.fontSizes.body,
    primaryColor: customProperties.colorInfo95,
    primaryBorderColor: customProperties.colorInfo,
    primaryTextColor: designSystem.colors.light.textPrimary,

    secondaryColor: customProperties.colorAccent40,
    secondaryBorderColor: customProperties.colorAccent30,
    secondaryTextColor: designSystem.colors.light.textPrimary,

    tertiaryColor: customProperties.colorPrimary95,
    tertiaryBorderColor: customProperties.colorPrimary25,
    tertiaryTextColor: designSystem.colors.light.textPrimary,

    // notes are conventionally yellow but there is none in the design system
    noteBkgColor: 'lightyellow',
    noteTextColor: designSystem.colors.light.textPrimary,
    noteBorderColor: 'yellow',

    errorBkgColor: designSystem.colors.light.surfaceError,
    errorTextColor: designSystem.colors.light.textError,

    // sequence diagram specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=sequence-diagram
    sequenceNumberColor: designSystem.colors.light.textInverted,
    actorLineColor: designSystem.colors.light.borderInfo,

    // flow chart specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=flowchart
    edgeLabelBackground: designSystem.colors.light.surfaceSecondary1,
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'cardinal',
  },
  sequence: {
    // https://mermaid-js.github.io/mermaid/#/sequenceDiagram?id=possible-configuration-parameters
    fontFamily: designSystem.typography.fontFamilies.primary,
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

    actorFontSize: designSystem.typography.fontSizes.body,
    actorFontWeight: designSystem.typography.fontWeights.regular,
    messageFontSize: designSystem.typography.fontSizes.body,
    messageFontFamily: designSystem.typography.fontFamilies.primary,
    messageFontWeight: designSystem.typography.fontWeights.regular,
    noteFontSize: designSystem.typography.fontSizes.small,
  },
  gantt: {
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
    fontFamily: designSystem.typography.fontFamilies.primary,
  },
  // this low level CSS override is rather a bugfix workaround, resetting fill and stroke to fix font rendering.
  themeCSS: `
  .messageText {
    color: ${designSystem.colors.light.textSecondary}
    fill: inherit;
    stroke: inherit;
  }
`,
} as const;

const Figure = styled.figure`
  background-color: ${designSystem.colors.light.surfaceSecondary1};
  border-radius: ${designSystem.tokens.borderRadiusForImageFrame};
  margin: 0;
  padding: ${designSystem.dimensions.spacings.xs};
  display: flex;
  justify-content: center;
  line-height: normal;
  a span.nodeLabel {
    color: ${designSystem.colors.light.link} !important;
    text-decoration: underline;
  }
`;

const idForGraph = (graph: string) => `mermaid-${murmurhash.v3(graph)}`;

mermaid.initialize(config);

type MermaidProps = {
  graph: string;
};

const Mermaid = ({ graph }: MermaidProps) => {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    mermaid.mermaidAPI.render(idForGraph(graph), graph, (svg: string) => {
      setSvg(svg);
    });
  }, [graph]);

  return <Figure dangerouslySetInnerHTML={{ __html: svg }}></Figure>;
};
Mermaid.propTypes = {
  graph: PropTypes.string.isRequired,
};

export default Mermaid;
