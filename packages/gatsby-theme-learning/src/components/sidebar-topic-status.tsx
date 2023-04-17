import React, { useContext } from 'react';
import { CheckActiveIcon, CircleIcon } from '@commercetools-uikit/icons';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useFetchCourseDetails,
  getTopicStatusByPageTitle,
} from '../hooks/use-course-details';
import ConfigContext, {
  isFeatureEnabled,
  EFeatureFlag,
} from './config-context';
import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';

const UnknownStateSpacer = styled.div`
  width: ${designSystem.dimensions.spacings.m};
  margin-left: 5px;
`;

type StatusIndicatorProps = {
  status?: string;
};

export const StatusIndicator = (props: StatusIndicatorProps) => {
  switch (props.status) {
    case 'completed':
      return <CheckActiveIcon color="primary" size="medium" />;
    case 'notCompleted':
      return <CircleIcon color="neutral60" size="medium" />;
    default:
      return <UnknownStateSpacer />;
  }
};

type PageTopicStatusProps = {
  courseId: number;
  pageTitle: string;
};

const SidebarTopicStatus = (props: PageTopicStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data } = useFetchCourseDetails(props.courseId);
  const { features } = useContext(ConfigContext);

  // CourseStatus feature flag
  if (!isFeatureEnabled(EFeatureFlag.CourseStatus, features)) {
    return null;
  }

  const topicStatus = data?.result?.topics
    ? getTopicStatusByPageTitle(data.result.topics, props.pageTitle)
    : undefined;

  return (
    props.courseId &&
    isAuthenticated && <StatusIndicator status={topicStatus} />
  );
};

export default SidebarTopicStatus;
