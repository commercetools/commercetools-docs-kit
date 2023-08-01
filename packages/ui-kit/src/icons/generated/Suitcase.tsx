/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSuitcase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="src/icons/svg/*.svg"
    height="src/icons/svg/*.svg"
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
      <clipPath id="suitcase_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>{' '}
      <clipPath id="suitcase_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="suitcase_svg__e"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="suitcase_svg__d" mask-type="alpha">
        <use href="#suitcase_svg__a" />
      </mask>
      <g
        id="suitcase_svg__a"
        clipPath="url(#suitcase_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <path
          fillOpacity={0}
          stroke="#121331"
          strokeWidth={3.5}
          d="M-14.5-27.125V-32.5c0-2.76 2.24-5 5-5h19c2.76 0 5 2.24 5 5v5.5"
          style={{
            display: 'block',
          }}
          transform="matrix(3.9 0 0 3.9 250 250)"
        />
        <g
          style={{
            display: 'block',
          }}
        >
          <path
            fillOpacity={0}
            stroke="#121331"
            strokeWidth={13.65}
            d="M92.05 286.808h311.025"
          />
          <path
            fillOpacity={0}
            stroke="#121331"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={13.65}
            d="M213.254 290.463v32.112h73.43V289"
          />
          <path fill="red" d="M213.254 290.463v32.112h73.43V289" />
          <path
            fillOpacity={0}
            stroke="#121331"
            strokeWidth={13.65}
            d="M404.05 185.65v163.8c0 21.524-17.476 39-39 39h-234c-21.524 0-39-17.476-39-39v-163.8c0-21.524 17.476-39 39-39h234c21.524 0 39 17.476 39 39z"
          />
        </g>
      </g>
    </defs>
    <g
      clipPath="url(#suitcase_svg__c)"
      mask="url(#suitcase_svg__d)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#suitcase_svg__e)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#4AE0EB"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="suitcase_svg__design"
        />
        <path
          fill="#CA5EED"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="suitcase_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgSuitcase;
