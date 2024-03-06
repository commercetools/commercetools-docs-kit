import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import {
  CourseCard,
  getCourseStatusByCourseId,
  useAuthentication,
  useFetchCourses,
} from '@commercetools-docs/gatsby-theme-docs';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import { designSystem } from '@commercetools-docs/ui-kit';

const inProgressFirst = (a, b) => {
  if (a.status === 'inProgress' && b.status !== 'inProgress') {
    return -1; // a comes before b
  } else if (a.status !== 'inProgress' && b.status === 'inProgress') {
    return 1; // b comes before a
  } else {
    return 0; // no change in order
  }
};

const EnrolledLearningPaths = (props) => {
  const { data } = useFetchCourses();
  const { isAuthenticated } = useAuthentication();
  const [expandedLP, setExpandedLP] = useState([]);
  // lpInfo format
  //   [
  //     {
  //         "lpId": 86,
  //         "status": "inProgress",
  //         "title": "Administrator learning path",
  //         "courses": [
  //             {
  //                 "courseId": 69
  //             },
  //             {
  //                 "courseId": 66
  //             }
  //         ]
  //     }
  // ]
  const [lpInfo, setLpInfo] = useState([]);

  const toggleFunction = (lpId) => {
    setExpandedLP((prevExpandedLP) => {
      if (prevExpandedLP.includes(lpId)) {
        return prevExpandedLP.filter((id) => id !== lpId);
      } else {
        return [...prevExpandedLP, lpId];
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated && data?.result?.enrolledCourses) {
      const lpInfoUnsorted = Object.entries(props.learningPathsInfo).map(
        ([lpId, lpInfo]) => {
          lpId = parseInt(lpId, 10);
          const lpStatus = getCourseStatusByCourseId(
            data.result.enrolledCourses,
            lpId
          );
          return { lpId, status: lpStatus, ...lpInfo };
        }
      );
      // set the initial state of expanded learning paths (we want the ones in progress to be expanded)
      setExpandedLP(
        lpInfoUnsorted
          .filter((lp) => lp.status === 'inProgress')
          .map((item) => item.lpId)
      );
      // set component state (lpInfo) with the ones in progress first
      setLpInfo(lpInfoUnsorted.sort(inProgressFirst));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isAuthenticated, props.courseId, props.learningPathsInfo]);

  return lpInfo
    .filter((item) => item.status !== 'notEnrolled')
    .map((item) => (
      <CollapsiblePanel
        key={item.lpId}
        isClosed={!expandedLP?.includes(item.lpId)}
        header={item.title}
        secondaryHeader={<StatusHeader status={item.status}></StatusHeader>}
        onToggle={() => toggleFunction(item.lpId)} // Add this line
      >
        {item.courses.map((course) => (
          <CourseCard
            title={props.coursesInfo[course.courseId].title}
            courseId={course.courseId}
            duration={props.coursesInfo[course.courseId].duration}
            href={props.coursesInfo[course.courseId].href}
            key={course.courseId}
          >
            {props.coursesInfo[course.courseId].description}
          </CourseCard>
        ))}
      </CollapsiblePanel>
    ));
};

EnrolledLearningPaths.propTypes = {
  learningPathsInfo: PropTypes.objectOf(
    PropTypes.shape({ title: PropTypes.string, courseId: PropTypes.number })
  ),
  coursesInfo: PropTypes.objectOf({
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    href: PropTypes.string,
  }),
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

export default EnrolledLearningPaths;
