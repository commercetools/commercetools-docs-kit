import React, { useContext } from 'react';
import { CheckActiveIcon, CircleIcon } from '@commercetools-uikit/icons';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useFetchCourseDetails,
  getTopicStatusByPageTitle,
} from '../hooks/use-course-details';
import ConfigContext from './config-context';

type StatusIndicatorProps = {
  status?: string;
};

export const StatusIndicator = (props: StatusIndicatorProps) =>
  props.status && props.status === 'completed' ? (
    <CheckActiveIcon color="primary" size="medium" />
  ) : (
    <CircleIcon color="neutral60" size="medium" />
  );

type PageTopicStatusProps = {
  courseId: number;
  pageTitle: string;
};

const SidebarTopicStatus = (props: PageTopicStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data } = useFetchCourseDetails(props.courseId);
  const {
    features: { courseStatusIndicator },
  } = useContext(ConfigContext);

  // courseStatusIndicator feature flag
  if (!courseStatusIndicator) {
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
