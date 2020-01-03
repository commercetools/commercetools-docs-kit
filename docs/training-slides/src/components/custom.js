import styled from '@emotion/styled';
import {
  Subtitle,
  ContentNotifications,
  TextSmall,
} from '@commercetools-docs/ui-kit';

const Aside = styled.aside({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  background: 'yellow',
  padding: '0.5em',
});

const TitleSlide = styled.div({
  display: 'block',
  margin: 'auto',
  textAlign: 'center',
  fontSize: '2em',
});

export default {
  Aside,
  TitleSlide,
  Subtitle,
  TextSmall,
  Info: ContentNotifications.Info,
  Warning: ContentNotifications.Warning,
  Error: ContentNotifications.Error,
};
