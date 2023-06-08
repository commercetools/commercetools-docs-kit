import * as React from 'react';
import type { SVGProps } from 'react';
const SvgRibbon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#E6E6E6"
      fillRule="evenodd"
      d="M12.322 2h-8.63C3.304 2 3 2.278 3 2.632v10.736c0 .227.138.442.36.555a.705.705 0 0 0 .705-.038l3.942-2.4 3.928 2.413a.68.68 0 0 0 .387.101.69.69 0 0 0 .318-.076.636.636 0 0 0 .36-.555V2.632c.013-.354-.29-.632-.678-.632z"
    />
  </svg>
);
export default SvgRibbon;
