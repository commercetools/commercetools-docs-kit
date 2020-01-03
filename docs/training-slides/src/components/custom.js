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
  boxShadow: designSystem.tokens.shadow8,
  borderRadius: pxToRem(designSystem.tokens.borderRadius4),
  padding: designSystem.dimensions.spacings.m,
  background: designSystem.colors.light.surfacePrimary,
  textAlign: 'left',
  width: '100%',
});

const Horizontal = styled.div({
  display: 'flex',
  alignSelf: 'flex-end',
  '& > *': {
    marginLeft: '0.5rem !important',
    marginRight: '0.5rem !important',
  },
  '& > first-child': {
    marginLeft: '0 !important',
  },
  '& > last-child': {
    marginRight: '0 !important',
  },
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
