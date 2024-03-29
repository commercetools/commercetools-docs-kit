import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import LeftGrassIcon from '../icons/left-grass.svg';
import RightGrassIcon from '../icons/right-grass.svg';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  width: 100%;
  background-color: #4242b2;
`;

const BackgroundLayer = styled.div`
  z-index: 0;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LeftGrassIconContainer = styled.div`
  z-index: -1;
  display: none;
  position: absolute;
  left: -72px;

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: block;
    top: 128px;
  }
  @media screen and (${designSystem.dimensions.viewports.desktop}) {
    display: block;
    top: 0;
  }
  svg {
    rotate: 60deg;
  }
`;

const RightGrassIconContainer = styled.div`
  z-index: -1;

  display: none;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: block;
  }
  position: absolute;
  right: 7px;
  bottom: 35px;
  svg {
    rotate: 245deg;
  }
`;
const ContentWrapper = styled.div`
  margin: 0 5%;

  @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
    margin: 0 auto;
    max-width: 886px;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 34px solid transparent;
  border-right: 34px solid transparent;
  border-top: 48px solid #fff;
`;

const TriangleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullWidthContainer = ({ children, nograss }) => {
  return (
    <Container>
      <TriangleWrapper>
        <Triangle></Triangle>
      </TriangleWrapper>
      <BackgroundLayer>
        {!nograss && (
          <LeftGrassIconContainer>
            <LeftGrassIcon />
          </LeftGrassIconContainer>
        )}
        <ContentWrapper>{children}</ContentWrapper>
        {!nograss && (
          <RightGrassIconContainer>
            <RightGrassIcon />
          </RightGrassIconContainer>
        )}
      </BackgroundLayer>
    </Container>
  );
};

export default FullWidthContainer;

FullWidthContainer.propTypes = {
  children: PropTypes.node,
  nograss: PropTypes.bool,
};
