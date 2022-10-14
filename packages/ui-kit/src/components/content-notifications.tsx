import { type ReactNode } from 'react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {
  InformationIcon,
  WarningIcon,
  ErrorIcon,
} from '@commercetools-uikit/icons';
import { TypographyContainer } from './markdown';
import { colors, tokens, dimensions } from '../design-system';

const getIconByType = (type: ContentNotificationProps['type']) => {
  switch (type) {
    case 'warning':
      return WarningIcon;
    case 'error':
      return ErrorIcon;
    default:
      return InformationIcon;
  }
};
const getIconColorByType = (type: ContentNotificationProps['type']) => {
  switch (type) {
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
};
const Container = styled.div`
  background-color: ${(props: ContentNotificationProps) => {
    switch (props.type) {
      case 'warning':
        return colors.light.surfaceWarning;
      case 'error':
        return colors.light.surfaceError;
      default:
        return colors.light.surfaceInfo;
    }
  }};
  border: 1px solid
    ${(props: ContentNotificationProps) => {
      switch (props.type) {
        case 'warning':
          return colors.light.textWarning;
        case 'error':
          return colors.light.textError;
        default:
          return colors.light.textInfo;
      }
    }};
  border-radius: ${tokens.borderRadiusForContentNotification};
  padding: ${dimensions.spacings.m};
`;

const ContentNotification = ({
  type = 'info',
  children,
}: ContentNotificationProps) => {
  const Icon = getIconByType(type);
  const iconColor = getIconColorByType(type);
  return (
    <Container type={type}>
      <SpacingsInline scale="s" alignItems="flex-start">
        <div>
          <Icon color={iconColor} />
        </div>
        {/* NOTE: we assume that the content of the elements in the MDX file
        respects the empty lines between the component declaration, in order
        for MDX to parse the content into React components.
        See https://github.com/mdx-js/mdx/issues/628

        Example (does not work):
          <Info>
            This *is* **markdown**!
          </Info>

        Example (it works):
          <Info>

            This *is* **markdown**!

          </Info>
        */}
        <TypographyContainer>{children}</TypographyContainer>
      </SpacingsInline>
    </Container>
  );
};
type ContentNotificationType = 'error' | 'warning' | 'info';
type ContentNotificationProps = {
  type?: ContentNotificationType;
  children?: ReactNode;
};

const Info = (props: ContentNotificationProps) => (
  <ContentNotification {...props} type="info" />
);
const Error = (props: ContentNotificationProps) => (
  <ContentNotification {...props} type="error" />
);
const Warning = (props: ContentNotificationProps) => (
  <ContentNotification {...props} type="warning" />
);

const ContentNotifications = { Info, Error, Warning };
export default ContentNotifications;
