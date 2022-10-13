import type { ComponentType } from 'react';
import type { Plugin } from 'unified';

declare const markdownFragmentToReact: (
  markdownString: string,
  customElements?: Record<string, ComponentType>,
  customPlugin?: Plugin
) => JSX.Element;

export default markdownFragmentToReact;
