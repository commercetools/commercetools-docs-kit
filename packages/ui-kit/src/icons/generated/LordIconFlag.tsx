import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconFlag = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-flag_svg__d">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-flag_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-flag_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-flag_svg__f"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-flag_svg__e" mask-type="alpha">
        <use href="#a" />
      </mask>
      <g
        id="lord-icon-flag_svg__a"
        fillOpacity={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#lord-icon-flag_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <path
          stroke="#121331"
          strokeWidth={12}
          d="m-115.914-13.182-.207 180.636"
          style={{
            display: 'block',
          }}
          transform="translate(250.151 248.818)"
        />
        <g
          clipPath="url(#lord-icon-flag_svg__c)"
          style={{
            display: 'block',
          }}
        >
          <path
            stroke="#08A88A"
            strokeWidth={12}
            d="M-116.185-3.241v-162.577c53.284-9.75 89.039 11.576 139.537 11.576 38.247 0 100.257-16.267 100.257-16.267L71.856-79.221l51.253 71.789s-66.004 19.847-98.757 19.77c-46.84-.11-113.52-32.156-140.537-15.579z"
            style={{
              display: 'block',
            }}
            transform="translate(250.151 240.818)"
          />
        </g>
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-flag_svg__d)"
      mask="url(#lord-icon-flag_svg__e)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-flag_svg__f)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#00B39E"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-flag_svg__design"
        />
        <path
          fill="#068BDF"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-flag_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconFlag;
