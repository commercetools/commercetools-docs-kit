import { type FC } from 'react';
import LoginButton from '../../sso/components/login-button';
import { Link } from '../../../components';
import styled from '@emotion/styled';

interface LoginOrGuestProps {
  href: string;
  loginLabel?: string;
  guestLabel?: string;
}

const Container = styled.div`
  display: flex;
`;

const GuestContainer = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const LoginOrGuest: FC<LoginOrGuestProps> = (props) => {
  return (
    <Container>
      <LoginButton
        theme="primary"
        label={props.loginLabel || 'Log in or sign up to track your progress'}
      />
      <GuestContainer>
        <Link href={props.href}>{props.guestLabel || 'Continue as guest'}</Link>
      </GuestContainer>
    </Container>
  );
};

export default LoginOrGuest;
