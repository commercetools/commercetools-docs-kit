import { useContext } from 'react';
import PrimaryButton from './primary-button';
import CtCubeWhiteIcon from '../icons/CtCubeWhite';
import { AuthenticatedContextApi } from '../../../components/authenticated-context';

const VerifyButton = (props: { label: string; size?: string }) => {
  const { openProfileModal } = useContext(AuthenticatedContextApi);

  return (
    <PrimaryButton
      size={props.size}
      data-testid="quiz-login-button"
      onClick={() =>
        openProfileModal({ title: 'Verify your profile.', isDismissable: true })
      }
    >
      <CtCubeWhiteIcon />
      <p>
        <b>ID</b> | {props.label}
      </p>
    </PrimaryButton>
  );
};

export default VerifyButton;
