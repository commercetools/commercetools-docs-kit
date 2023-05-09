import React, { useContext } from 'react';
import { CircleIcon, VerifiedIcon } from '@commercetools-uikit/icons';
import {
  getCourseStatusByCourseId,
  useFetchCourses,
} from '../hooks/use-course-status';
import ConfigContext, {
  isFeatureEnabled,
  EFeatureFlag,
} from './config-context';
import styled from '@emotion/styled';

const UnknownStateSpacer = styled.div`
  min-width: 21px;
  margin-right: 5px;
`;

type StatusIndicatorProps = {
  status?: string;
};

export const StatusIndicator = (props: StatusIndicatorProps) => {
  switch (props.status) {
    case 'completed':
      return <VerifiedIcon color="primary" size="big" />;
    case 'inProgress':
    case 'notEnrolled':
      return <CircleIcon color="neutral60" size="big" />;
    default:
      return <UnknownStateSpacer />;
  }
};

type SidebarCourseStatusProps = {
  courseId: number;
};

const SidebarCourseStatus = (props: SidebarCourseStatusProps) => {
  const { data } = useFetchCourses();
  const { features } = useContext(ConfigContext);

  // CourseStatus feature flag
  if (!isFeatureEnabled(EFeatureFlag.CourseStatus, features)) {
    return null;
  }

  const courseStatus = data?.result?.enrolledCourses
    ? getCourseStatusByCourseId(data.result.enrolledCourses, props.courseId)
    : undefined;
  return <>{props.courseId && <StatusIndicator status={courseStatus} />}</>;
};

export default SidebarCourseStatus;
