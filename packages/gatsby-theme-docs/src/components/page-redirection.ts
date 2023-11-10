import { useEffect } from 'react';
import { navigate } from 'gatsby';

type PageRedirectionProps = {
  to?: string;
  delay?: number;
};

const PageRedirection = (props: PageRedirectionProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(props.to || '/');
    }, props.delay || 5000);

    return () => clearTimeout(timeoutId);
  }, [props.to, props.delay]);

  return null;
};

export default PageRedirection;
