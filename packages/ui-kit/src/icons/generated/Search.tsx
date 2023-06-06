import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M5.556 12.14a4.832 4.832 0 0 1 0-4.81A4.782 4.782 0 0 1 9.7 4.924c1.71 0 3.29.917 4.145 2.406a4.832 4.832 0 0 1 0 4.81A4.782 4.782 0 0 1 9.7 14.547c-1.71 0-3.29-.917-4.145-2.405m15.18 7.427-5.713-5.742a6.752 6.752 0 0 0 .48-7.458A6.694 6.694 0 0 0 9.702 3a6.694 6.694 0 0 0-5.803 3.368 6.765 6.765 0 0 0 0 6.735 6.676 6.676 0 0 0 9.85 2l5.715 5.745a.896.896 0 0 0 1.273 0 .909.909 0 0 0 0-1.28"
    />
  </svg>
);
export default SvgSearch;
