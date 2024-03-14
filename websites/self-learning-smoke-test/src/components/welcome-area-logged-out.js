import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import GraduationIcon from '../icons/graduation.svg';
import { designSystem } from '@commercetools-docs/ui-kit';
import { LoginButton } from '@commercetools-docs/gatsby-theme-docs';

const WelcomeAreaLoggedOut = () => {
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
    padding: 0 10%;
    display: flex;
    flex-wrap: wrap;
  `;

  const TextContainer = styled.div`
    padding-top: 88px;
    @media screen and (${designSystem.dimensions.viewports.mobile}) {
      padding-top: 0;
    }
    flex: 1 1 50%;
  `;

  const ImageContainer = styled.div`
    flex: 1 1 30%;
    display: flex;
    justify-content: flex-end;
    @media screen and (${designSystem.dimensions.viewports.tablet}) {
      justify-content: flex-start;
    }
    @media screen and (${designSystem.dimensions.viewports.mobile}) {
      justify-content: flex-start;
    }
  `;

  const Icon1Container = styled.div`
    position: relative;
    top: 10px;
    svg {
      @media screen and (${designSystem.dimensions.viewports.mobile}) {
        top: 40px;
        width: 180px;
        height: 180px;
      }
      @media screen and (${designSystem.dimensions.viewports.tablet}) {
        width: 180px;
        height: 180px;
      }
      @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
        width: 180px;
        height: 180px;
      }
      @media screen and (${designSystem.dimensions.viewports.desktop}) {
        width: 300px;
        height: 300px;
      }
    }
  `;

  const ButtonArea = styled.div`
    display: flex;
  `;

  return (
    <Container>
      <TextContainer>
        <SpacingsStack scale="l">
          <TextSalutation>Learn Commerceools</TextSalutation>
          <AdditonalText>
            Growing your commercetools knowledge made simple
          </AdditonalText>
          <ButtonArea>
            <LoginButton
              size="large"
              theme="primary"
              label="Login or join for free"
            ></LoginButton>
          </ButtonArea>
        </SpacingsStack>
      </TextContainer>
      <ImageContainer>
        <Icon1Container>
          <GraduationIcon />
        </Icon1Container>
      </ImageContainer>
    </Container>
  );
};

export default WelcomeAreaLoggedOut;
