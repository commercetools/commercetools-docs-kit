import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getCourseStatusByCourseId,
  useFetchCourses,
} from '../hooks/use-course-status';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from './config-context';

type CourseStatusProps = {
  error?: string;
  status?: string;
};

const CourseStatus = (props: CourseStatusProps) => {
  if (props.error) {
    return <span>unavailable</span>;
  }
  if (props.status) {
    return <span>{props.status}</span>;
  }
  return null;
};

type PageCourseStatusProps = {
  courseId: number;
};

const PageCourseStatus = (props: PageCourseStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data, isLoading, error } = useFetchCourses();
  const { features } = useContext(ConfigContext);

  // courseStatusIndicator feature flag
  if (!isFeatureEnabled(EFeatureFlag.CourseStatus, features)) {
    return null;
  }

  const courseStatus = data?.result?.enrolledCourses
    ? getCourseStatusByCourseId(data.result.enrolledCourses, props.courseId)
    : undefined;
  return (
    <>
      {props.courseId && isAuthenticated && (
        <div>
          Course status:{' '}
          {isLoading ? (
            '...'
          ) : (
            <CourseStatus status={courseStatus} error={error} />
          )}
        </div>
      )}
    </>
  );
};

export default PageCourseStatus;
