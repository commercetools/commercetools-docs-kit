import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

export const ChatContainer = styled.div`
  height: 100%;
  max-width: ${designSystem.dimensions.widths.pageContentWithMarginsAndPageNavigation};
  margin: auto;
  margin-top -8px; /* hack: take back the full content area, the basic dialog has two spacings configured at the top */
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 'chat';

  @media screen and (${designSystem.dimensions.viewports.tablet}) {
    grid-template-columns: auto 30%;
    grid-template-areas: 'chat references';
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
    ${designSystem.dimensions.spacings.m} 0
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
  padding-top: ${designSystem.dimensions.spacings.s};
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
  padding: 0px ${designSystem.dimensions.spacings.m};
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
  padding-top: ${designSystem.dimensions.spacings.m};
`;

export const SideTopContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0px ${designSystem.dimensions.spacings.m};
  border: 1px solid ${designSystem.colors.light.borderPrimary};
  background-color: ${designSystem.colors.light.surfacePrimary};
  border-radius: 4px;
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
  line-height: 22px;
  a {
    color: ${designSystem.colors.light.textPrimary};
  }
`;

export const DisclaimerTextMobile = styled.p`
  margin-top: ${designSystem.dimensions.spacings.m};
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  line-height: 22px;
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
