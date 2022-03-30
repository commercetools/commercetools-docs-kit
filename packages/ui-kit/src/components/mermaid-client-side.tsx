import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mermaid from 'mermaid';
import { colors, typography, tokens, dimensions } from '../design-system';
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
    background: colors.light.surfacePrimary,
    lineColor: colors.light.borderInfo,
    textColor: colors.light.textPrimary,
    fontFamily: typography.fontFamilies.primary,
    fontSize: typography.fontSizes.body,
    primaryColor: customProperties.colorInfo95,
    primaryBorderColor: customProperties.colorInfo,
    primaryTextColor: colors.light.textPrimary,

    secondaryColor: customProperties.colorAccent40,
    secondaryBorderColor: customProperties.colorAccent30,
    secondaryTextColor: colors.light.textPrimary,

    tertiaryColor: customProperties.colorPrimary95,
    tertiaryBorderColor: customProperties.colorPrimary25,
    tertiaryTextColor: colors.light.textPrimary,

    // notes are conventionally yellow but there is none in the design system
    noteBkgColor: 'lightyellow',
    noteTextColor: colors.light.textPrimary,
    noteBorderColor: 'yellow',

    errorBkgColor: colors.light.surfaceError,
    errorTextColor: colors.light.textError,

    // sequence diagram specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=sequence-diagram
    sequenceNumberColor: colors.light.textInverted,
    actorLineColor: colors.light.borderInfo,

    // flow chart specifics:
    // https://mermaid-js.github.io/mermaid/#/theming?id=flowchart
    edgeLabelBackground: colors.light.surfaceSecondary1,
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

const Figure = styled.figure`
  background-color: ${colors.light.surfaceSecondary1};
  border-radius: ${tokens.borderRadiusForImageFrame};
  margin: 0;
  padding: ${dimensions.spacings.xs};
  display: flex;
  justify-content: center;
  line-height: normal;
  a span.nodeLabel {
    color: ${colors.light.link} !important;
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
