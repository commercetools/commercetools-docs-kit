import React, { useContext, useEffect, useState } from 'react';
import { CircleIcon, VerifiedIcon } from '@commercetools-uikit/icons';
import {
  getCourseStatusByCourseId,
  useFetchCourses,
  ClientCourseStatus,
} from '../hooks/use-course-status';
import ConfigContext, {
  isFeatureEnabled,
  EFeatureFlag,
} from '../../components/config-context';
import styled from '@emotion/styled';
import { useAuth0 } from '@auth0/auth0-react';

const UnknownStateSpacer = styled.div`
  min-width: 21px;
  margin-right: 5px;
`;

/**
 *  'completed' // course completed, we display a green tick icon
 *  'inProgress' // user enrolled but course not completed/passed, we display an empty circle icon
 *  'notEnrolled' // user not enrolled into course completed/passed, we display an empty circle icon
 *  'notAvailable' // error during fetching operation, we display an empty circle icon
 *  'isLoading' // API request in progress, we display an empty circle icon
 *  undefined; // user is not logged in, we display an empty placeholder
 */
type StatusIndicatorProps = {
  status?: ClientCourseStatus;
};

export const StatusIndicator = (props: StatusIndicatorProps) => {
  switch (props.status) {
    case 'completed':
      return (
        <VerifiedIcon data-test-id="verified" color="primary" size="big" />
      );
    case 'inProgress':
    case 'notEnrolled':
    case 'isLoading':
      return <CircleIcon data-test-id="circle" color="neutral60" size="big" />;
    default:
      return <UnknownStateSpacer />;
  }
};

type SidebarCourseStatusProps = {
  courseId: number;
};

const SidebarCourseStatus = (props: SidebarCourseStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data, isLoading } = useFetchCourses();
  const { selfLearningFeatures } = useContext(ConfigContext);
  const [courseStatus, setCourseStatus] = useState<
    ClientCourseStatus | undefined
  >();

  // If status-indicator feature flag is disable OR the user is logged out
  // it will pass undefined to StatusIndicator which in turn will render an empty spacer...
  useEffect(() => {
    if (
      !isFeatureEnabled(EFeatureFlag.CourseStatus, selfLearningFeatures) ||
      !isAuthenticated
    ) {
      setCourseStatus(undefined);
    } else if (isLoading) {
      // ...if data is loading, set the `isLoading` status
      setCourseStatus('isLoading');
    } else {
      //... otherwise getCourseStatusByCourseId helper will return the proper status prop to the StatusIndicator component
      setCourseStatus(
        getCourseStatusByCourseId(data?.result?.enrolledCourses, props.courseId)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, props.courseId, isAuthenticated, isLoading]);

  return (
    <span data-test-id={`sidebar-course-status-${props.courseId}`}>
      {props.courseId && <StatusIndicator status={courseStatus} />}
    </span>
  );
};

export default SidebarCourseStatus;
