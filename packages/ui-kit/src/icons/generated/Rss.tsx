import * as React from 'react';
import type { SVGProps } from 'react';
const SvgRss = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#999"
      fillRule="evenodd"
      d="M10.933 12.4A7.333 7.333 0 0 0 3.6 5.067V3.6a8.8 8.8 0 0 1 8.8 8.8h-1.467zm-2.533 0a4.8 4.8 0 0 0-4.8-4.8V6a6.4 6.4 0 0 1 6.4 6.4H8.4zm-3.2 0a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zM11.75 2h-7.5A2.25 2.25 0 0 0 2 4.25v7.5A2.25 2.25 0 0 0 4.25 14h7.5A2.25 2.25 0 0 0 14 11.75v-7.5A2.25 2.25 0 0 0 11.75 2z"
    />
  </svg>
);
export default SvgRss;
