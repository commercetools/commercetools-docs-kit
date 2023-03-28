import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useFetchCourses,
  getCourseStatusByCourseId,
} from '@commercetools-docs/gatsby-theme-learning';
import PropTypes from 'prop-types';

const CourseStatus = (props) => {
  if (props.error) {
    return <span>unavailable</span>;
  }
  if (props.status) {
    return <span>{props.status}</span>;
  }
};

CourseStatus.propTypes = {
  error: PropTypes.string,
  status: PropTypes.string,
};

const PageCourseStatus = (props) => {
  const { isAuthenticated } = useAuth0();
  const { data, isLoading, error } = useFetchCourses();

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

PageCourseStatus.propTypes = {
  courseId: PropTypes.number.isRequired,
};

export default PageCourseStatus;
