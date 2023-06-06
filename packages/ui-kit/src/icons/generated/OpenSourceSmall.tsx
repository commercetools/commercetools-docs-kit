import * as React from 'react';
import { SVGProps } from 'react';
const SvgOpenSourceSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={25}
    height={25}
    viewBox="0 0 25 25"
    {...props}
  >
    <defs>
      <path id="open-source-small_svg__a" d="M0 0h6v11H0z" />
      <path id="open-source-small_svg__c" d="M0 0h11v6H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)">
        <mask id="open-source-small_svg__b" fill="#fff">
          <use xlinkHref="#open-source-small_svg__a" />
        </mask>
        <path
          fill="#003037"
          d="M3 .8c1.23 0 2.227 1.01 2.227 2.256 0 1.247-.997 2.257-2.227 2.257S.773 4.303.773 3.056C.773 1.81 1.77.8 3 .8m-.386 5.254V11h.772V6.053c1.643-.216 2.802-1.74 2.589-3.405C5.76.984 4.257-.19 2.614.026.97.242-.188 1.766.025 3.43a3.02 3.02 0 0 0 2.589 2.622"
          mask="url(#open-source-small_svg__b)"
        />
      </g>
      <path
        fill="#003037"
        d="M20.953 1.772c1.247 0 2.259.998 2.259 2.228 0 1.23-1.012 2.228-2.26 2.228-1.247 0-2.259-.998-2.259-2.228 0-1.23 1.012-2.228 2.26-2.228m0 5.228c1.68.002 3.045-1.338 3.047-2.995.002-1.657-1.357-3.003-3.038-3.005-1.53-.002-2.825 1.117-3.022 2.614H13v.772h4.952c.183 1.495 1.473 2.619 3 2.614"
      />
      <g transform="translate(1 18)">
        <mask id="open-source-small_svg__d" fill="#fff">
          <use xlinkHref="#open-source-small_svg__c" />
        </mask>
        <path
          fill="#003037"
          d="M3.047 5.228C1.8 5.228.788 4.23.788 3 .788 1.77 1.8.772 3.048.772 4.294.772 5.306 1.77 5.306 3c0 1.23-1.012 2.228-2.26 2.228m0-5.228C1.367-.002.002 1.338 0 2.995-.002 4.652 1.357 5.998 3.038 6c1.53.002 2.825-1.117 3.022-2.614H11v-.742H6.048c-.17-1.508-1.463-2.647-3-2.644"
          mask="url(#open-source-small_svg__d)"
        />
      </g>
      <path
        fill="#003037"
        d="M20.97 23.2c-1.23 0-2.227-1.01-2.227-2.256 0-1.247.997-2.257 2.227-2.257s2.228 1.01 2.228 2.257c0 1.246-.998 2.256-2.228 2.256Zm.386-5.253V13h-.742v4.947c-1.643.216-2.802 1.74-2.589 3.405.214 1.664 1.718 2.838 3.361 2.622 1.643-.216 2.802-1.74 2.589-3.405a3.02 3.02 0 0 0-2.589-2.622h-.03ZM11 16.801 13.283 8l.717.199L11.717 17zM16.482 15 19 11.997 16.482 9 16 9.574l2.037 2.423L16 14.426zM9 14.426l-2.035-2.43L9 9.575 8.523 9 6 11.997 8.523 15z"
      />
    </g>
  </svg>
);
export default SvgOpenSourceSmall;
