import React, { useContext } from 'react';
import { CheckActiveIcon, CircleIcon } from '@commercetools-uikit/icons';
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
  min-width: ${designSystem.dimensions.spacings.m};
  margin-right: 5px;
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
  const { data } = useFetchCourseDetails(props.courseId);
  const { features } = useContext(ConfigContext);

  // CourseStatus feature flag
  if (!isFeatureEnabled(EFeatureFlag.CourseStatus, features)) {
    return null;
  }

  const topicStatus = data?.result?.topics
    ? getTopicStatusByPageTitle(data.result.topics, props.pageTitle)
    : undefined;

  return props.courseId && <StatusIndicator status={topicStatus} />;
};

export default SidebarTopicStatus;
