import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

type ImageCardProps = {
  children: ReactNode;
};

const CardContainer = styled.li`
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  list-style: none;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 70%;
  }
`;

const ImageCard = (props: ImageCardProps) => {
  console.log(props.children);
  return (
    <CardContainer>
      <ImageContainer>{props.children}</ImageContainer>
    </CardContainer>
  );
};

export default ImageCard;
