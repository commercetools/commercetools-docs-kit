import styled from '@emotion/styled';
import {
  Subtitle,
  ContentNotifications,
  TextSmall,
  designSystem,
} from '@commercetools-docs/ui-kit';

const { pxToRem } = designSystem;

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

const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: designSystem.dimensions.spacings.m,
  boxShadow: designSystem.tokens.shadow8,
  borderRadius: pxToRem(designSystem.tokens.borderRadius4),
  padding: designSystem.dimensions.spacings.m,
  background: designSystem.colors.light.surfacePrimary,
  textAlign: 'left',
  width: '100%',
});

const Horizontal = styled.div({
  display: 'flex',
  flex: 1,
  height: '100%',
});

export default {
  Aside,
  TitleSlide,
  Subtitle,
  TextSmall,
  Card,
  Horizontal,
  Info: ContentNotifications.Info,
  Warning: ContentNotifications.Warning,
  Error: ContentNotifications.Error,
};
