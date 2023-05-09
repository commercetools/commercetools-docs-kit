import React, { useContext, useEffect, useState } from 'react';
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
import { useAuth0 } from '@auth0/auth0-react';

const UnknownStateSpacer = styled.div`
  width: ${designSystem.dimensions.spacings.m};
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
    case 'notAvailable':
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
  const [topicStatus, setTopicStatus] = useState<string | undefined>();
  const { data } = useFetchCourseDetails(props.courseId);
  const { features } = useContext(ConfigContext);

  useEffect(() => {
    if (
      // CourseStatus feature flag
      isFeatureEnabled(EFeatureFlag.CourseStatus, features) &&
      isAuthenticated
    ) {
      setTopicStatus(
        data?.result?.topics
          ? getTopicStatusByPageTitle(data.result.topics, props.pageTitle)
          : 'notAvailable'
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features, data, isAuthenticated]);

  return props.courseId && <StatusIndicator status={topicStatus} />;
};

export default SidebarTopicStatus;
