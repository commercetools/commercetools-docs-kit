// TODO: evaluate the actual need of this component.
// if we just want to render a div, it could be superfluous.
import { ReactNode } from 'react';

export interface PathBlockProps {
  syncWith?: string;
  label: string;
  children: ReactNode;
}

const PathBlock = (props: PathBlockProps) => {
  return <div>{props.children}</div>;
};

export default PathBlock;
