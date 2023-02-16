import styled from '@emotion/styled';
import * as designSystem from '../design-system';
import { css } from '@emotion/react';

/**
 * the docs ui kit provides the basic elements to compose card UIs but does not provide
 * the finished card, which would imply how Links are handled and would imply certain context
 *
 * A full composition of a card could look like:
 * <CardContainer {...props}>
 *  <Link>
 *    <StackContainer>
 *        <ImageContainer>{props.image}</ImageContainer>
 *          <StackContainer>
 *            <IconContainer>{props.icon}</IconContainer>}
 *            <StackContainer scale="s">
 *              <Title smallTitle={props.smallTitle}>{props.title}</Title>
 *                <BodyContainer>
 *                    {props.children}
 *                </BodyContainer>
 *                <ReadMoreContainer>
 *                  <ReadMore>
 *                    <Link href={props.href} nounderline>
 *                        {props.textLink}
 *                    </Link>
 *                  </ReadMore>
 *                </ReadMoreContainer>
 *            </StackContainer>
 *        </StackContainer>
 *      </StackContainer>
 *    </Link>
 *  </CardContainer>
 */

export type CardsContainerProps = {
  narrow?: boolean;
  fitContentColumn?: boolean;
};
export const CardsContainer = styled.ul<CardsContainerProps>`
  list-style: none;
  display: grid;
  gap: ${designSystem.dimensions.spacings.m};
  grid-auto-columns: 1fr;
  grid-template-columns: ${(props) => {
    let columnMinWidth;
    if (props.narrow) {
      columnMinWidth = designSystem.dimensions.widths.cardNarrowMinWidth;
    } else {
      columnMinWidth = props.fitContentColumn
        ? designSystem.dimensions.widths.cardRegularMinWidthInContentColumn
        : designSystem.dimensions.widths.cardRegularMinWidth;
    }
    return `repeat( auto-fill, minmax(${columnMinWidth}, 1fr)) `;
  }};
`;

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
export type CardContainerProps = {
  clickable?: boolean;
};
export const CardContainer = styled.li<CardContainerProps>`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
  list-style: none;
`;
export const ImageContainer = styled.div`
  svg,
  img {
    width: 100%;
    height: auto;
  }
`;
export const IconContainer = styled.div`
  width: ${designSystem.dimensions.spacings.big};
  min-width: ${designSystem.dimensions.spacings.big};
  height: ${designSystem.dimensions.spacings.big};

  svg {
    width: 100%;
    height: 100%;
  }
`;
export const InlineContainer = styled.div`
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
export type TitleProps = {
  smallTitle?: boolean;
};
export const Title = styled.h6<TitleProps>`
  ${(props) => (props.smallTitle ? smallTitle : normalTitle)};
  color: ${designSystem.colors.light.textPrimary};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;
export const BodyContainer = styled.div`
  color: ${designSystem.colors.light.textPrimary};
`;
export const ReadMoreContainer = styled.div``;
export const ReadMore = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-top: ${designSystem.dimensions.spacings.m};
  margin-top: ${designSystem.dimensions.spacings.m};
`;
export type StackContainerProps = {
  scale?: string;
};
const getStackContainerMarginStyle = (props: StackContainerProps) => {
  switch (props.scale) {
    case 's':
      return designSystem.dimensions.spacings.s;
    default:
      return designSystem.dimensions.spacings.m;
  }
};
export const StackContainer = styled.div<StackContainerProps>`
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
