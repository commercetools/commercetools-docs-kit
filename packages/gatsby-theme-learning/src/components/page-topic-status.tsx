import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useFetchCourseDetails,
  getTopicStatusByPageTitle,
} from '../hooks/use-course-details';
import ConfigContext from './config-context';

const spin = keyframes`
  to {
      transform: rotate(360deg);
    }`;

const LoadingIcon = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s ease-in-out infinite;
`;

const colorByStatus = (status?: string) => {
  switch (status) {
    case 'completed':
      return '#7CFC00';
    case 'notCompleted':
      return '#D3D3D3';
    default:
      return '#000';
  }
};

type StatusIndicatorProps = {
  status?: string;
};

const StatusIndicator = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${(props: StatusIndicatorProps) =>
    colorByStatus(props.status)};
  border-radius: 50%;
  display: inline-block;
`;

type PageTopicStatusProps = {
  courseId: number;
  pageTitle: string;
};

const PageTopicStatus = (props: PageTopicStatusProps) => {
  const { isAuthenticated } = useAuth0();
  const { data, isLoading } = useFetchCourseDetails(props.courseId);
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
    <>
      {props.courseId && isAuthenticated && topicStatus && (
        <StatusIndicator status={topicStatus} />
      )}
      {isLoading && <LoadingIcon />}
    </>
  );
};

export default PageTopicStatus;
