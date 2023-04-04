import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CircleIcon, VerifiedIcon } from '@commercetools-uikit/icons';
import {
  getCourseStatusByCourseId,
  useFetchCourses,
} from '../hooks/use-course-status';
import ConfigContext, {
  isFeatureEnabled,
  EFeatureFlag,
} from './config-context';

type StatusIndicatorProps = {
  status?: string;
};

export const StatusIndicator = (props: StatusIndicatorProps) =>
  props.status && props.status === 'completed' ? (
    <VerifiedIcon color="primary" size="big" />
  ) : (
    <CircleIcon color="neutral60" size="big" />
  );

type SidebarCourseStatusProps = {
  courseId: number;
};

const SidebarCourseStatus = (props: SidebarCourseStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data } = useFetchCourses();
  const { features } = useContext(ConfigContext);

  // CourseStatus feature flag
  if (!isFeatureEnabled(EFeatureFlag.CourseStatus, features)) {
    return null;
  }

  const courseStatus = data?.result?.enrolledCourses
    ? getCourseStatusByCourseId(data.result.enrolledCourses, props.courseId)
    : undefined;
  return (
    <>
      {props.courseId && isAuthenticated && (
        <StatusIndicator status={courseStatus} />
      )}
    </>
  );
};

export default SidebarCourseStatus;
