import { ReactNode, useEffect, useState } from 'react';
import { markdownFragmentToReact } from '@commercetools-docs/ui-kit';
import { useOrderedCoursesInfo } from '../hooks/use-course-pages';
import useAuthentication from '../../sso/hooks/use-authentication';

const content = (children: ReactNode | string) => {
  if (typeof children === 'string') {
    return markdownFragmentToReact(children as string);
  }
  return children;
};

type IfLearningPathCompleteProps = {
  children: ReactNode;
};

export const IfLearningPathComplete = (props: IfLearningPathCompleteProps) => {
  const { isAuthenticated } = useAuthentication();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const courseInfo = useOrderedCoursesInfo();
  useEffect(() => {
    if (isAuthenticated && courseInfo) {
      const incompleteCourse = courseInfo.find(
        (course) => course.status !== 'completed'
      );
      !incompleteCourse ? setIsVisible(true) : setIsVisible(false);
    }
  }, [isAuthenticated, courseInfo]);
  return isAuthenticated && isVisible ? content(props.children) : null;
};

export const IfLearningPathNotComplete = (
  props: IfLearningPathCompleteProps
) => {
  const { isAuthenticated } = useAuthentication();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const courseInfo = useOrderedCoursesInfo();
  useEffect(() => {
    if (isAuthenticated && courseInfo) {
      const incompleteCourse = courseInfo.find(
        (course) => course.status !== 'completed'
      );
      !incompleteCourse ? setIsVisible(false) : setIsVisible(true);
    }
  }, [isAuthenticated, courseInfo]);
  return isAuthenticated && isVisible ? content(props.children) : null;
};
