import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

export const ChatContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'chat';

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-template-columns: auto 25%;
    grid-template-areas: 'chat references';
  }

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    grid-template-columns: 15% auto 25% 15%;
    grid-template-areas: 'left-blank chat references right-blank';
  }
`;

export const ChatMainArea = styled.div`
  grid-area: chat;
  display: flex;
  flex-direction: column;
  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    border-right: 2px solid #e1e2ea;
  }
`;

export const ChatMainAreaWhenLoggedOut = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatMessagesWrapper = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  padding: 0px ${designSystem.dimensions.spacings.m};
  overflow-y: scroll;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 18px),
    transparent 100%
  );
`;

export const ChatInputBox = styled.div`
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};
`;

export const ResetButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${designSystem.dimensions.spacings.m};
`;

export const RestartButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${designSystem.dimensions.spacings.m};
`;

export const LockedChatFooterContainer = styled.div`
  padding: ${designSystem.dimensions.spacings.m};
`;

export const CubeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 2px solid #e1e2ea;
`;

export const ChatSideArea = styled.div`
  padding: 0px ${designSystem.dimensions.spacings.s};
  grid-area: references;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: none;
  }
`;

export const InputTextWrapper = styled.div`
  display: flex;
`;

export const SubmitButtonBox = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  margin-top: 38px;
  background-color: #fff;
  margin-left: 8px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

export const ChatBottomContainer = styled.div`
  margin-top: auto;
  padding: ${designSystem.dimensions.spacings.m}
    ${designSystem.dimensions.spacings.m} ${designSystem.dimensions.spacings.l}
    ${designSystem.dimensions.spacings.m};
`;

export const SideTopContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0px ${designSystem.dimensions.spacings.m};
`;

export const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SideDebugContainer = styled.div`
  padding: 0px ${designSystem.dimensions.spacings.m};
  margin-bottom: ${designSystem.dimensions.spacings.m};
`;

export const LeftBlank = styled.div`
  grid-area: left-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    display: block;
  }
`;

export const RightBlank = styled.div`
  grid-area: right-blank;
  display: none;

  @media screen and (${designSystem.dimensions.viewports.largeDesktop}) {
    display: block;
  }
`;

export const CharCount = styled.div`
  padding-right: 5px;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  color: ${(props) =>
    props.status
      ? `${designSystem.colors.light.textError}`
      : `${designSystem.colors.light.textFaded}`};
`;

export const DisclaimerText = styled.p`
  text-align: center;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: ${designSystem.typography.lineHeights.tight};
  a {
    color: ${designSystem.colors.light.textPrimary};
  }
`;

export const DisclaimerTextMobile = styled.p`
  text-align: center;
  margin-top: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: ${designSystem.typography.lineHeights.tight};
  display: none;
  a {
    color: ${designSystem.colors.light.textPrimary};
  }
  @media screen and (${designSystem.dimensions.viewports.mobile}) {
    display: inline;
  }
`;

export const NotificationTextSmall = styled.p`
  font-size: ${designSystem.typography.fontSizes.small};

  b {
    font-weight: ${designSystem.typography.fontWeights['light-bold']};
  }
`;

export const NotificationTextBig = styled.p`
  font-size: ${designSystem.typography.fontSizes.body};
`;

export const NotificationListText = styled.p`
  font-size: ${designSystem.typography.fontSizes.small};
  padding-left: 8px;
`;
