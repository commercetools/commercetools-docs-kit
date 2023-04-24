import type { ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { markdownFragmentToReact } from '@commercetools-docs/ui-kit';

const content = (children: ReactNode | string) => {
  if (typeof children === 'string') {
    return markdownFragmentToReact(children as string);
  }
  return children;
};

type IsLoggedInProps = {
  children: ReactNode;
};

export const IsUserLoggedIn = (props: IsLoggedInProps) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? content(props.children) : null;
};

type IsLoggedOutProps = {
  children: ReactNode;
};

export const IsUserLoggedOut = (props: IsLoggedOutProps) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? content(props.children) : null;
};
