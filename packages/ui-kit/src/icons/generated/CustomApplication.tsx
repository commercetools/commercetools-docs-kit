import * as React from 'react';
import { SVGProps } from 'react';
const SvgCustomApplication = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={80}
    height={80}
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="#003037" fillRule="nonzero">
      <path d="M3 50h33V5H3v45ZM5.622 7.642h27.756v39.736H5.622V7.642ZM43 31v45h33V31H43Zm30.378 42.358H45.622V33.622h27.756v39.736ZM3 76h33V56H3v20Zm2.622-17.336h27.756v14.672H5.622V58.664ZM59.169 24h2.662v-7.157H69v-2.666h-7.169V7H59.17v7.177H52v2.666h7.169z" />
    </g>
  </svg>
);
export default SvgCustomApplication;
