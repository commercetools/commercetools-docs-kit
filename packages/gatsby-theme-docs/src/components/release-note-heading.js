import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  font-weight: ${designSystem.typography.fontWeights.bold};
  line-height: ${designSystem.typography.lineHeights.releaseNoteHeader};
  font-size: ${designSystem.typography.fontSizes.h3};
  color: unset;
  margin: ${(props) =>
      props.as === 'h1'
        ? designSystem.dimensions.spacings.l
        : designSystem.dimensions.spacings.huge}
    0 0 !important;
`;
export const ReleaseNotePageTitle = (props) => <Container as="h1" {...props} />;
export const ReleaseNoteListTitle = (props) => <Container as="h3" {...props} />;
