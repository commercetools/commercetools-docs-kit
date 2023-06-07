import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTutorialsSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    {...props}
  >
    <g fill="#003037" fillRule="nonzero">
      <path d="M21.573 6H3.427A2.436 2.436 0 0 0 1 8.44v12.127A2.436 2.436 0 0 0 3.427 23h18.146A2.436 2.436 0 0 0 24 20.567V8.439A2.436 2.436 0 0 0 21.573 6Zm1.603 14.567a1.611 1.611 0 0 1-1.603 1.607H3.427a1.611 1.611 0 0 1-1.603-1.607V8.439c0-.888.716-1.61 1.603-1.613h18.146a1.612 1.612 0 0 1 1.603 1.613v12.128Z" />
      <path d="m10 19 6-4-6-4v8Zm.809-6.446L14.456 15l-3.647 2.453v-4.899ZM5 2h15v1H5z" />
    </g>
  </svg>
);
export default SvgTutorialsSmall;
