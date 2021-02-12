import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designSystem, Markdown } from '@commercetools-docs/ui-kit';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';
import Link from './link';

const flatStyle = css`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
`;
const clickableStyle = css`
  cursor: pointer;
  box-shadow: ${designSystem.tokens.shadowForClickableCard};
  :hover {
    box-shadow: ${designSystem.tokens.shadowForClickableCardOnHover};
  }
  transition: box-shadow 0.1s ease-in-out;
`;
const Container = styled.li`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
`;
const ImageContainer = styled.div`
  svg,
  img {
    width: 100%;
    height: auto;
  }
`;
const IconContainer = styled.div`
  width: ${designSystem.dimensions.spacings.big};
  min-width: ${designSystem.dimensions.spacings.big};
  height: ${designSystem.dimensions.spacings.big};

  svg {
    width: 100%;
    height: 100%;
  }
`;
const InlineContainer = styled.div`
  display: flex;
  height: 100%;
  > * + * {
    margin-left: ${designSystem.dimensions.spacings.m};
  }
`;
const normalTitle = css`
  font-size: ${designSystem.typography.fontSizes.h3};
  line-height: ${designSystem.typography.lineHeights.cardNormalTitle};
`;
const smallTitle = css`
  font-size: ${designSystem.typography.fontSizes.h4};
  line-height: ${designSystem.typography.lineHeights.cardSmallTitle};
`;
const Title = styled.h6`
  ${(props) => (props.smallTitle ? smallTitle : normalTitle)};
  color: ${designSystem.colors.light.textPrimary};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;
const BodyContainer = styled.div`
  color: ${designSystem.colors.light.textPrimary};
`;
const ReadMoreContainer = styled.div``;
const ReadMore = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-top: ${designSystem.dimensions.spacings.m};
  margin-top: ${designSystem.dimensions.spacings.m};
`;
const getStackContainerMarginStyle = (props) => {
  switch (props.scale) {
    case 's':
      return designSystem.dimensions.spacings.s;
    default:
      return designSystem.dimensions.spacings.m;
  }
};
const StackContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  flex-direction: column;

  > * + * {
    margin-top: ${getStackContainerMarginStyle};
  }
  > ${ReadMoreContainer} {
    margin-top: auto;
  }
`;

const BodyContent = (props) => {
  if (typeof props.children === 'string') {
    return props.clickable
      ? markdownFragmentToReact(props.children, { a: styled.span`` })
      : markdownFragmentToReact(props.children);
  }
  return (
    <Markdown.TypographyContainer>
      {props.children}
    </Markdown.TypographyContainer>
  );
};
BodyContent.displayName = 'BodyContent';
BodyContent.propTypes = {
  clickable: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const WrapWith = (props) =>
  props.condition ? props.wrapper(props.children) : props.children;
WrapWith.displayName = 'WrapWith';
WrapWith.propTypes = {
  condition: PropTypes.bool.isRequired,
  wrapper: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Card = (props) => (
  <Container {...props}>
    <WrapWith
      condition={Boolean(props.clickable && props.href)}
      wrapper={(children) => (
        <Link href={props.href} noUnderline>
          {children}
        </Link>
      )}
    >
      <StackContainer>
        {props.image && <ImageContainer>{props.image}</ImageContainer>}
        <WrapWith
          condition={true}
          wrapper={(children) =>
            props.narrow ? (
              <StackContainer>{children}</StackContainer>
            ) : (
              <InlineContainer>{children}</InlineContainer>
            )
          }
        >
          <>
            {props.icon && <IconContainer>{props.icon}</IconContainer>}

            <StackContainer scale="s">
              {props.title && (
                <Title smallTitle={props.smallTitle}>{props.title}</Title>
              )}
              {props.children && (
                <BodyContainer>
                  <BodyContent clickable={props.clickable}>
                    {props.children}
                  </BodyContent>
                </BodyContainer>
              )}
              {props.href && props.textLink && (
                <ReadMoreContainer>
                  <ReadMore>
                    {props.clickable ? (
                      props.textLink
                    ) : (
                      <Link href={props.href} noUnderline>
                        {props.textLink}
                      </Link>
                    )}
                  </ReadMore>
                </ReadMoreContainer>
              )}
            </StackContainer>
          </>
        </WrapWith>
      </StackContainer>
    </WrapWith>
  </Container>
);
Card.displayName = 'Card';
Card.propTypes = {
  clickable: PropTypes.bool,
  narrow: PropTypes.bool,
  smallTitle: PropTypes.bool,
  image: PropTypes.element,
  title: PropTypes.string,
  href: PropTypes.string,
  textLink: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired,
};

export default Card;
