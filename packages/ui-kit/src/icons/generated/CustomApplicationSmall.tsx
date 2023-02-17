import * as React from 'react';
import { SVGProps } from 'react';
const SvgCustomApplicationSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="#003037" fillRule="nonzero">
      <path d="M1 15.944h10.397V2H1v13.944Zm.826-13.125h8.745V15.13H1.826V2.82ZM13.603 10.056V24H24V10.056H13.603Zm9.57 13.125H14.43V10.87h8.745V23.18ZM1 24h10.397v-6.197H1V24Zm.826-5.372h8.745v4.547H1.826v-4.547ZM18.697 7.887h.839V5.67h2.259v-.826h-2.26V2.62h-.838v2.224h-2.259v.826h2.259z" />
    </g>
  </svg>
);
export default SvgCustomApplicationSmall;
