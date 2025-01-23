import type { FC, PropsWithChildren } from 'react';
import { GraduationCapIcon } from '@commercetools-uikit/icons';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  display: flex;
  align-items: center;

  & svg {
    margin-right: ${designSystem.dimensions.spacings.s};
  }
`;

const Text = styled.span`
  font-size: ${designSystem.typography.fontSizes.small};
  font-style: italic;

  & a {
    text-decoration: underline;
    color: ${designSystem.colors.light.link};

    &:hover {
      color: ${designSystem.colors.light.linkHover};
    }
  }
`;

const SelfLearningContentNotification: FC<PropsWithChildren> = (props) => {
  return (
    <Container>
      <GraduationCapIcon color="info" />
      <Text>{props.children}</Text>
    </Container>
  );
};

export default SelfLearningContentNotification;
