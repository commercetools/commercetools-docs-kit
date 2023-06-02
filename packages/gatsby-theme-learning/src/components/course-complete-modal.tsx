import { SyntheticEvent, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useFetchCourseDetails } from '../hooks/use-course-details';
import { ConfirmationDialog, useModalState } from '@commercetools-docs/ui-kit';
import Text from '@commercetools-uikit/text';
import Link from '@commercetools-uikit/link';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { gtagEvent } from '@commercetools-docs/gatsby-theme-sso-ui-kit';
import useIsClientSide from '../hooks/use-is-client-side';
import {
  OrderedCoursesInfo,
  useOrderedCoursesInfo,
} from '../hooks/use-course-pages';

type CourseCompleteModalProps = {
  courseId: number;
};

const SUPPORT_DEEPLINK =
  'https://commercetools.atlassian.net/servicedesk/customer/portal/22/group/47/create/122?summary=Self%20Learning:[Add%20Title%20Here]';

/**
 * Returns
 * - the next (relative to the current) unfinished course path or
 * - the first unfinished course path starting from the first in the learning path or
 * - landing page url (/) in case all the courses are in completed state
 */
export const getNextUnfinishedCoursePath = (
  coursesInfo: OrderedCoursesInfo[],
  currentCourseId: number
): string => {
  const currentCourseIndex = coursesInfo.findIndex(
    (course) => course.courseId === currentCourseId
  );
  const nextUnfinished = coursesInfo
    .slice(currentCourseIndex)
    .find((courseInfo) => courseInfo.status !== 'completed');
  if (nextUnfinished) {
    return nextUnfinished.pages[0]?.path;
  }
  const prevUnfinished = coursesInfo.find(
    (courseInfo) => courseInfo.status !== 'completed'
  );
  if (prevUnfinished) {
    return prevUnfinished.pages[0]?.path;
  }
  return '/';
};

const CourseCompleteModal = (props: CourseCompleteModalProps) => {
  const [courseStatus, setCourseStatus] = useState<
    'inProgress' | 'completed' | undefined
  >();
  const [modalSize, setModalSize] = useState<'l' | 'm'>('l');
  const [text, setText] = useState<string>(
    "You've now completed this module and unlocked a new skill!"
  );
  const { isModalOpen, openModal, closeModal } = useModalState();
  const { data } = useFetchCourseDetails(props.courseId);
  const { isClientSide } = useIsClientSide();
  const [goToUrl, setGoToUrl] = useState<string>('/');
  const courseInfo = useOrderedCoursesInfo();

  useEffect(() => {
    if (courseInfo) {
      setGoToUrl(getNextUnfinishedCoursePath(courseInfo, props.courseId));
    }
  }, [courseInfo, props.courseId]);

  useEffect(() => {
    if (goToUrl === '/') {
      setText("You've now completed this learning path");
    }
  }, [goToUrl]);

  useEffect(() => {
    const newCourseStatus = data?.result?.status;
    // when course status passed from 'inProgress' to 'completed'...
    if (
      courseStatus === 'inProgress' &&
      newCourseStatus &&
      newCourseStatus === 'completed'
    ) {
      // ... display this modal
      openModal();
      gtagEvent('unlock_achievement', {
        achievement_id: 'course ' + props.courseId.toString(),
      });
    }
    setCourseStatus(newCourseStatus);
  }, [data, courseStatus, openModal, props.courseId]);

  useEffect(() => {
    // adaptive modal. If viewport is less than 530, use medium modal size
    if (isClientSide && window.innerWidth < 530) {
      setModalSize('m');
    }
  }, [isClientSide]);

  const onConfirmHandler = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    closeModal();
    navigate(goToUrl);
  };

  return (
    <ConfirmationDialog
      testid="module-complete-modal"
      title="Congratulations! &#127881;"
      isOpen={isModalOpen}
      size={modalSize}
      labelPrimary="Continue"
      onClose={closeModal}
      onCancel={closeModal}
      onConfirm={onConfirmHandler}
    >
      <SpacingsStack scale="m">
        <Text.Body>{text}</Text.Body>
        <Text.Body isItalic>
          We value your feedback and would love to hear about your experience
          with the course.
          <Link isExternal={true} to={SUPPORT_DEEPLINK}>
            Click here to provide feedback via our support portal.
          </Link>
        </Text.Body>
      </SpacingsStack>
    </ConfirmationDialog>
  );
};

export default CourseCompleteModal;
