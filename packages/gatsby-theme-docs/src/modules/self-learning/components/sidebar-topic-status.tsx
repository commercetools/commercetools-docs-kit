import React, { useContext, useEffect, useState } from 'react';
import { CheckActiveIcon, CircleIcon } from '@commercetools-uikit/icons';
import {
  useFetchCourseDetails,
  getTopicStatusByPageTitle,
} from '../hooks/use-course-details';
import ConfigContext, {
  isFeatureEnabled,
  EFeatureFlag,
} from '../../../components/config-context';
import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import { useAuth0 } from '@auth0/auth0-react';

const UnknownStateSpacer = styled.div`
  min-width: ${designSystem.dimensions.spacings.m};
  margin-right: 5px;
`;

type TopicStatus =
  | 'completed' // course completed, we display a green tick icon
  | 'inProgress' // user enrolled but course not completed/passed, we display an empty circle icon
  | 'notAvailable' // error during fetching operation, we display an empty circle icon
  | 'isLoading' // API fetch in progress, we display an empty circle icon
  | undefined; // user is not logged in, we display an empty placeholder

type StatusIndicatorProps = {
  status?: TopicStatus;
};

export const StatusIndicator = (props: StatusIndicatorProps) => {
  switch (props.status) {
    case 'completed':
      return (
        <CheckActiveIcon
          data-test-id="checkActive"
          color="primary"
          size="medium"
        />
      );
    case 'inProgress':
    case 'notAvailable':
    case 'isLoading':
      return (
        <CircleIcon data-test-id="circle" color="neutral60" size="medium" />
      );
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
  const [topicStatus, setTopicStatus] = useState<TopicStatus>();
  const { data, isLoading } = useFetchCourseDetails(props.courseId);
  const { selfLearningFeatures } = useContext(ConfigContext);

  // If status-indicator feature flag is disable OR the user is logged out
  // it will pass undefined to StatusIndicator which in turn will render an empty spacer...
  useEffect(() => {
    if (
      !isFeatureEnabled(EFeatureFlag.CourseStatus, selfLearningFeatures) ||
      !isAuthenticated
    ) {
      setTopicStatus(undefined);
    } else if (isLoading) {
      // ...if data is loading, set the `isLoading` status
      setTopicStatus('isLoading');
    } else {
      setTopicStatus(
        getTopicStatusByPageTitle(data?.result?.topics, props.pageTitle)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfLearningFeatures, data, isAuthenticated]);

  return props.courseId && <StatusIndicator status={topicStatus} />;
};

export default SidebarTopicStatus;
