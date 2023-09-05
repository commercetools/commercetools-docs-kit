import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Markdown,
  markdownFragmentToReact,
  cardElements,
  MultiCodeBlockMarkdownWrapper,
} from '@commercetools-docs/ui-kit';
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

const BodyContent = (props) => {
  if (typeof props.children === 'string') {
    return props.clickable
      ? markdownFragmentToReact(props.children, { a: styled.span`` })
      : markdownFragmentToReact(props.children, { a: GatsbyLink });
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

const testValue = `Certainly! Here's an example of a simple JavaScript code snippet with four lines:

\`\`\`javascript
const name = 'John';
console.log('Hello, ' + name + '!');

const age = 25;
console.log('You are ' + age + ' years old.');
\`\`\`

This code declares a variable \`name\` with the value "John" and logs a greeting message to the console. It also declares a variable \`age\` with the value 25 and logs a message about the age.
`;

const TestMultiMarkdown = () => (
  <div>
    {markdownFragmentToReact(testValue, { pre: MultiCodeBlockMarkdownWrapper })}
  </div>
);

const Card = (props) => (
  <div>
    <TestMultiMarkdown />
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
  </div>
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
