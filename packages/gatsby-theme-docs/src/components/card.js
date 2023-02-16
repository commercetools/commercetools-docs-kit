import React from 'react';
import PropTypes from 'prop-types';
import { cardElements } from '@commercetools-docs/ui-kit';
import GatsbyLink from './link';

const {
  CardContainer,
  StackContainer,
  ImageContainer,
  InlineContainer,
  IconContainer,
  BodyContainer,
  ReadMoreContainer,
  ReadMore,
  Title,
} = cardElements;

const WrapWith = (props) =>
  props.condition ? props.wrapper(props.children) : props.children;
WrapWith.displayName = 'WrapWith';
WrapWith.propTypes = {
  condition: PropTypes.bool.isRequired,
  wrapper: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const isReactLink = (alienElement) =>
  React.isValidElement(alienElement) && alienElement.props.href;

/**
 * Expects a React Link element, returns just the text contained in the link.
 * It handles only the simple case where the link text is a simple string.
 */
const removeLink = (linkNode) => {
  if (isReactLink(linkNode)) {
    if (typeof linkNode.props.children === 'string') {
      return linkNode.props.children;
    }
    return '';
  }
};

/**
 * This component main purpose is to manage the case in which a clickable card has
 * a body with a link defined. This is an invalid case as you'll end up with 2 nesed links.
 * So the processChildren function run through the body content removing any link and just
 * leaving a plain string (non linked).
 */
const BodyContent = (props) => {
  if (props.clickable) {
    return processChildren(props.children);
  }
  return props.children;
};

BodyContent.displayName = 'BodyContent';
BodyContent.propTypes = {
  clickable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const processChildren = (childrenNode) => {
  // it's just a string... phew!
  if (typeof childrenNode === 'string') {
    return childrenNode;
  }
  // React component witch is a Link
  if (isReactLink(childrenNode)) {
    return removeLink(childrenNode);
  }
  // any other React component
  if (React.isValidElement(childrenNode)) {
    return React.cloneElement(
      childrenNode,
      undefined,
      processChildren(childrenNode.props.children)
    );
  }
  // array
  if (Array.isArray(childrenNode)) {
    const result = [];
    childrenNode.forEach((nodeItem) => {
      result.push(processChildren(nodeItem));
    });
    return result;
  }
};

const Card = (props) => (
  <CardContainer {...props}>
    <WrapWith
      condition={Boolean(props.clickable && props.href)}
      wrapper={(children) => (
        <GatsbyLink href={props.href} nounderline noadditionalstyling>
          {children}
        </GatsbyLink>
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
                      <GatsbyLink href={props.href} nounderline>
                        {props.textLink}
                      </GatsbyLink>
                    )}
                  </ReadMore>
                </ReadMoreContainer>
              )}
            </StackContainer>
          </>
        </WrapWith>
      </StackContainer>
    </WrapWith>
  </CardContainer>
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
