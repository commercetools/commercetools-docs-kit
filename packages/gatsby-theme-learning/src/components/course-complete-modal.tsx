import { useEffect, useState } from 'react';
import { useFetchCourseDetails } from '../hooks/use-course-details';
import { ConfirmationDialog, useModalState } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import useIsClientSide from '../hooks/use-is-client-side';

type CourseCompleteModalProps = {
  courseId: number;
};

const CourseCompleteModal = (props: CourseCompleteModalProps) => {
  const [courseStatus, setCourseStatus] = useState<
    'inProgress' | 'completed' | undefined
  >();
  const [modalSize, setModalSize] = useState<'l' | 'm'>('l');
  const { isModalOpen, openModal, closeModal } = useModalState();
  const { data } = useFetchCourseDetails(props.courseId);
  const { isClientSide } = useIsClientSide();

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
    }
    setCourseStatus(newCourseStatus);
  }, [data]);

  useEffect(() => {
    if (isClientSide && window.innerWidth < 530) {
      setModalSize('m');
    }
  }, [isClientSide]);

  return (
    <ConfirmationDialog
      title="Congratulations! &#127881;"
      isOpen={isModalOpen}
      size={modalSize}
      labelPrimary="Continue"
      onClose={closeModal}
      onCancel={closeModal}
      onConfirm={closeModal}
    >
      <SpacingsStack scale="m">
        <p>You&apos;ve now completed this course and unlocked a new skill!</p>
      </SpacingsStack>
    </ConfirmationDialog>
  );
};

export default CourseCompleteModal;
