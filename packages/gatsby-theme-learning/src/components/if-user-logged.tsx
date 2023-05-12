import type { ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { markdownFragmentToReact } from '@commercetools-docs/ui-kit';

const content = (children: ReactNode | string) => {
  if (typeof children === 'string') {
    return markdownFragmentToReact(children as string);
  }
  return children;
};

type IfLoggedInProps = {
  children: ReactNode;
  assumeTrue: boolean;
};

export const IfUserLoggedIn = (props: IfLoggedInProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading && props.assumeTrue) {
    return content(props.children);
  } else {
    return isAuthenticated ? content(props.children) : null;
  }
};

type IsLoggedOutProps = {
  children: ReactNode;
  assumeTrue: boolean;
};

export const IfUserLoggedOut = (props: IsLoggedOutProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading && props.assumeTrue) {
    return content(props.children);
  } else if (isLoading) {
    return null;
  } else {
    return !isAuthenticated ? content(props.children) : null;
  }
};
