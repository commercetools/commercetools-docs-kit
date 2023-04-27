import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import {
  Markdown,
  markdownFragmentToReact,
  cardElements,
  designSystem,
} from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  ClockIcon,
  CheckActiveIcon,
  RocketIcon,
  CircleIcon,
} from '@commercetools-uikit/icons';
import Stamp from '@commercetools-uikit/stamp';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ClientCourseStatus,
  getCourseStatusByCourseId,
  useFetchCourses,
} from '../hooks/use-course-status';

const { CardContainer, StackContainer, InlineContainer, BodyContainer } =
  cardElements;

const StyledLink = styled.a`
  &,
  > code {
    color: ${designSystem.colors.light.link};
    text-decoration: none;
    :active,
    :focus,
    :hover {
      color: ${designSystem.colors.light.link};
    }
  }
`;

const GatsbyRouterLink = StyledLink.withComponent(Link);

const Title = styled.h6`
  color: ${designSystem.colors.light.link};
  font-size: ${designSystem.typography.fontSizes.small};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;

type IconWithTextContainerProps = {
  textSize?: string;
};

export const IconWithTextContainer = styled.div<IconWithTextContainerProps>`
  min-width: 18px;

  svg {
    display: inline-block;
  }
  p {
    margin-left: ${designSystem.dimensions.spacings.xs};
    font-size: ${(props) => (props.textSize === 'large' ? '14px' : '12px')};
    color: ${designSystem.colors.light.textPrimary};
    display: inline-block;
  }
`;

type CardBottomContainerProps = {
  separator?: boolean;
};

export const CardBottomContainer = styled.div<CardBottomContainerProps>`
  border-top: ${(props) => (props.separator ? '1px' : '0')} solid
    ${designSystem.colors.light.borderHighlight};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: ${designSystem.colors.light.textPrimary};
  padding: ${(props) => (props.separator ? '8px' : '0')} 0 0 0;
`;

type BodyContentProps = {
  children: string | ReactNode;
};

const BodyContent = (props: BodyContentProps) => {
  return (
    <div
      css={css`
        font-size: 12px;
      `}
    >
      {typeof props.children === 'string' ? (
        <Markdown.TypographyContainer>
          {markdownFragmentToReact(props.children)}
        </Markdown.TypographyContainer>
      ) : (
        props.children
      )}
    </div>
  );
};

type CourseStatusStampProps = {
  status: ClientCourseStatus;
};

const CourseStatusStamp = (props: CourseStatusStampProps) => {
  switch (props.status) {
    case 'completed':
      return (
        <Stamp
          tone="primary"
          isCondensed
          icon={<CheckActiveIcon />}
          label="Completed"
        />
      );
    case 'inProgress':
      return (
        <Stamp
          tone="information"
          isCondensed
          icon={<RocketIcon />}
          label="In progress"
        />
      );
    default:
      return (
        <Stamp
          tone="secondary"
          isCondensed
          icon={<CircleIcon />}
          label="Not started"
        />
      );
  }
};

type CourseCardProps = {
  title: string;
  href: string;
  courseId: string;
  children: ReactNode;
  duration: string;
};

const CourseCard = (props: CourseCardProps) => {
  const [courseStatus, setCourseStatus] = useState<ClientCourseStatus>();
  const { isAuthenticated } = useAuth0();
  const { data } = useFetchCourses();

  useEffect(() => {
    if (isAuthenticated && data?.result?.enrolledCourses) {
      const numberCourseId = parseInt(props.courseId, 10);
      setCourseStatus(
        getCourseStatusByCourseId(data.result.enrolledCourses, numberCourseId)
      );
    }
  }, [data, isAuthenticated, props.courseId]);

  return (
    <CardContainer {...props}>
      <GatsbyRouterLink to={props.href}>
        <StackContainer>
          <InlineContainer>
            <StackContainer scale="s">
              <Title>{props.title}</Title>
              <BodyContainer>
                <BodyContent>{props.children}</BodyContent>
              </BodyContainer>
              <CardBottomContainer>
                <IconWithTextContainer>
                  <ClockIcon />
                  <p>{props.duration}</p>
                </IconWithTextContainer>
                <div
                  css={css({ paddingTop: '2px' })}
                  style={designSystem.tokensToCssVars({
                    fontSizeForTextAsDetail:
                      designSystem.typography.fontSizes.extraSmall,
                  })}
                >
                  {props.courseId && isAuthenticated && courseStatus && (
                    <CourseStatusStamp
                      status={courseStatus}
                    ></CourseStatusStamp>
                  )}
                </div>
              </CardBottomContainer>
            </StackContainer>
          </InlineContainer>
        </StackContainer>
      </GatsbyRouterLink>
    </CardContainer>
  );
};

export default CourseCard;
