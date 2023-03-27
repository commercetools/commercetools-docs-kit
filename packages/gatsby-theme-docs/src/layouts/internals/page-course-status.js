import React from 'react';
import { useCourseStatusByCouseId } from '@commercetools-docs/gatsby-theme-learning';
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
  const { courseStatus, isLoading, error } = useCourseStatusByCouseId(
    props.courseId
  );
  console.log(courseStatus);
  return (
    <>
      {props.courseId && (
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
