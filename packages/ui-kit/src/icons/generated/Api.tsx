import * as React from 'react';
import type { SVGProps } from 'react';
const SvgApi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={500}
    height={500}
    style={{
      width: '100%',
      height: '100%',
      transform: 'translate3d(0,0,0)',
      contentVisibility: 'visible',
    }}
    viewBox="0 0 500 500"
    {...props}
  >
    <defs>
      <clipPath id="api_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="api_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter id="api_svg__e" width="300%" height="300%" x="-100%" y="-100%">
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="api_svg__d" mask-type="alpha">
        <use href="#api_svg__a" />
      </mask>
      <g
        id="api_svg__a"
        fillOpacity={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12}
        clipPath="url(#api_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <path
          stroke="#08A88A"
          d="M-68.004-31.131h21.12c10.13 0 18.43 7.51 18.43 16.69 0 4.58-2.08 8.75-5.42 11.78-3.34 3.02-7.95 4.9-13.01 4.9h-21.12m-.003-33.369v62.261m-25.765 0-26.043-62.702-27.831 62.702m47.466-15.428h-40.618M0 31.131v-62.262"
          style={{
            display: 'block',
          }}
          transform="translate(317.822 249.865)"
        />
        <path
          stroke="#121331"
          d="M107.598 113.063h-215.196c-28.222 0-51.1-22.878-51.1-51.1V-61.963c0-28.222 22.878-51.1 51.1-51.1h215.196c28.222 0 51.1 22.878 51.1 51.1V61.963c0 28.222-22.878 51.1-51.1 51.1z"
          style={{
            display: 'block',
          }}
          transform="translate(250 250)"
        />
      </g>
    </defs>
    <g
      clipPath="url(#api_svg__c)"
      mask="url(#api_svg__d)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#api_svg__e)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#4AE0EB"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="api_svg__design"
        />
        <path
          fill="#CA5EED"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="api_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgApi;
