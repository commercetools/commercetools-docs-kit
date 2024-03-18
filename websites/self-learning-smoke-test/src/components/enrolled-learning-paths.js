import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

import {
  CourseCard,
  useAuthentication,
  useFetchCourses,
} from '@commercetools-docs/gatsby-theme-docs';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { designSystem } from '@commercetools-docs/ui-kit';

const SectionWrapper = styled.div`
  padding-top: ${designSystem.dimensions.spacings.enormous};
  padding-bottom: ${designSystem.dimensions.spacings.l};
`;

const SectionTitle = styled.h3`
  font-size: ${designSystem.typography.fontSizes.h3};
  font-weight: 500;
`;

const SectionSubTitle = styled.h4`
  font-size: ${designSystem.typography.fontSizes.h4};
  font-weight: 700;
`;

const EnrolledLearningPaths = () => {
  const { data, isLoading } = useFetchCourses();

  return (
    <SectionWrapper>
      <SpacingsStack scale="l">
        <SectionTitle>Your learning</SectionTitle>
        <SectionSubTitle>Your self-learning progress</SectionSubTitle>
        {!isLoading &&
        data?.result?.enrolledCourses &&
        data.result.enrolledCourses.length > 0 ? (
          <p>
            Take a look at your badges and check the status of your
            certifications. Remember, you need to refresh your knowledge every
            year.
          </p>
        ) : (
          <p>
            You have not made any progress so far. Please scroll down to explore
            our carefully crafted learning paths to delve into interesting
            topics.
          </p>
        )}
        <LearningPathPanel
          title="Administrator Learning Path"
          learningPathCourseId="85"
        >
          <CourseCard
            title="Self-learning course 1"
            courseId="55"
            duration="30 min"
            href="course-1/overview"
          >
            Course description. Introduction to extensibility possibilities
            available in Composable Commerce.
          </CourseCard>
          <CourseCard
            title="Self-learning course 2"
            courseId="55"
            duration="30 min"
            href="course-2/overview"
          >
            **This is a course with markdown description** _some italics text
            here_
          </CourseCard>
          <CourseCard
            title="Self-learning course 1"
            courseId="70"
            duration="30 min"
            href="course-1/overview"
          >
            Course description. Introduction to extensibility possibilities
            available in Composable Commerce.
          </CourseCard>
          <CourseCard
            title="Self-learning course 2"
            courseId="70"
            duration="30 min"
            href="course-2/overview"
          >
            **This is a course with markdown description** _some italics text
            here_
          </CourseCard>
        </LearningPathPanel>
        <LearningPathPanel
          title="Developer Learning Path"
          learningPathCourseId="86"
        >
          <CourseCard
            title="Self-learning course 1"
            courseId="66"
            duration="30 min"
            href="course-1/overview"
          >
            Course description. Introduction to extensibility possibilities
            available in Composable Commerce.
          </CourseCard>
          <CourseCard
            title="Self-learning course 2"
            courseId="69"
            duration="30 min"
            href="course-2/overview"
          >
            **This is a course with markdown description** _some italics text
            here_
          </CourseCard>
        </LearningPathPanel>
      </SpacingsStack>
    </SectionWrapper>
  );
};

const StatusText = styled.span`
  padding-left: ${designSystem.dimensions.spacings.s};
  color: ${designSystem.colors.light.textFaded};
`;

const StatusHeader = ({ status }) => {
  if (status === 'inProgress') {
    return <StatusText>In progress</StatusText>;
  } else if (status === 'completed') {
    return <StatusText>Completed</StatusText>;
  } else {
    return null;
  }
};

StatusHeader.propTypes = {
  status: PropTypes.string,
};

const CoursesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${designSystem.dimensions.spacings.m};
  div {
    max-width: 300px;
  }
`;

const LearningPathPanel = (props) => {
  const { data } = useFetchCourses();
  const { isAuthenticated } = useAuthentication();
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [lpStatus, setLpStatus] = useState('notEnrolled');

  const toggleFunction = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  useEffect(() => {
    if (isAuthenticated && data?.result?.enrolledCourses) {
      // let's figure out if the user is enrolled into the learning path
      const enrolledCourse = data.result.enrolledCourses.find(
        (course) => course.id === parseInt(props.learningPathCourseId, 10)
      );
      console.log('enrolledCourse', enrolledCourse);
      if (enrolledCourse) {
        // if it is enrolled, let's set the status
        setLpStatus(enrolledCourse.status);
        // if the status is in progress, let's expand the panel
        setIsPanelExpanded(enrolledCourse.status === 'inProgress');
      }
    }
  }, [data, isAuthenticated, props.learningPathCourseId]);

  return isAuthenticated && lpStatus !== 'notEnrolled' ? ( // Add this line
    <CollapsiblePanel
      isClosed={!isPanelExpanded}
      header={props.title}
      secondaryHeader={<StatusHeader status={lpStatus}></StatusHeader>}
      onToggle={() => toggleFunction()}
    >
      <CoursesWrapper>{props.children}</CoursesWrapper>
    </CollapsiblePanel>
  ) : null;
};

LearningPathPanel.propTypes = {
  title: PropTypes.string.isRequired,
  learningPathCourseId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default EnrolledLearningPaths;
