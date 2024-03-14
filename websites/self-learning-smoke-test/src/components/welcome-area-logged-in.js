import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import GrowingPlantIcon from '../icons/growing-plant.svg';
import SunIcon from '../icons/sun.svg';
import { designSystem } from '@commercetools-docs/ui-kit';
import { FirstName } from '@commercetools-docs/gatsby-theme-docs';

const WelcomeAreaLoggedIn = () => {
  const TextSalutation = styled.h3`
    font-size: ${designSystem.typography.fontSizes.h2};
    color: ${designSystem.colors.light.textPrimary};

    @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
      font-size: ${designSystem.typography.fontSizes.h1};
    }
  `;

  const AdditonalText = styled.p`
    font-size: ${designSystem.typography.fontSizes.h4};
    color: ${designSystem.colors.light.textPrimary};
    @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
      font-size: ${designSystem.typography.fontSizes.h2};
    }
  `;

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

  const TextContainer = styled.div`
    padding-top: 88px;
    flex: 1 1 50%;
  `;

  const ImageContainer = styled.div`
    flex: 1 1 30%;
    display: flex;
    justify-content: flex-start;
    @media screen and (${designSystem.dimensions.viewports.desktop}) {
      justify-content: flex-end;
    }
  `;

  const Icon1Container = styled.div`
    position: relative;
    top: 10px;
  `;
  const Icon2Container = styled.div`
    position: relative;
    top: 107px;
  `;

  return (
    <Container>
      <TextContainer>
        <SpacingsStack scale="m">
          <TextSalutation>
            Hi, <FirstName />
          </TextSalutation>
          <AdditonalText>
            Let&apos;s grow your commercetools knowledge together!
          </AdditonalText>
        </SpacingsStack>
      </TextContainer>
      <ImageContainer>
        <Icon2Container>
          <GrowingPlantIcon />
        </Icon2Container>
        <Icon1Container>
          <SunIcon />
        </Icon1Container>
      </ImageContainer>
    </Container>
  );
};

export default WelcomeAreaLoggedIn;
