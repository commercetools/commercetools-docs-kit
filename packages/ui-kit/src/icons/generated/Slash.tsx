import * as React from 'react';
import { SVGProps } from 'react';

const SvgSlash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    width={16}
    height={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <rect stroke="#CCC" x={0.5} y={0.5} width={15} height={15} rx={2} />
      <path
        fill="#999"
        fillRule="nonzero"
        d="m7.211 12 2.657-7.139h-1.08L6.129 12z"
      />
    </g>
  </svg>
);

export default SvgSlash;
