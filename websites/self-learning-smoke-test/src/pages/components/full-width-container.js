import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import LeftGrassIcon from '../../icons/left-grass.svg';
import RightGrassIcon from '../../icons/right-grass.svg';
import { designSystem } from '@commercetools-docs/ui-kit';

const Container = styled.div`
  width: 100%;
  background-color: #4242b2;
`;

const BackgroundLayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LeftGrassIconContainer = styled.div`
  display: none;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: block;
  }
  position: absolute;
  left: -72px;
  svg {
    rotate: 60deg;
  }
`;

const RightGrassIconContainer = styled.div`
  display: none;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    display: block;
  }
  position: absolute;
  right: 0;
  bottom: 35px;
  svg {
    rotate: 245deg;
  }
`;
const ContentWrapper = styled.div`
  width: 80%;
  max-width: 1140px;
  margin: 0 auto;
`;

const FullWidthContainer = ({ children }) => {
  return (
    <Container>
      <BackgroundLayer>
        <LeftGrassIconContainer>
          <LeftGrassIcon />
        </LeftGrassIconContainer>
        <ContentWrapper>{children}</ContentWrapper>
        <RightGrassIconContainer>
          <RightGrassIcon />
        </RightGrassIconContainer>
      </BackgroundLayer>
    </Container>
  );
};

export default FullWidthContainer;

FullWidthContainer.propTypes = {
  children: PropTypes.node,
};
