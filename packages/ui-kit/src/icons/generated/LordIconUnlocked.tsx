import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconUnlocked = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-unlocked_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-unlocked_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-unlocked_svg__e"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-unlocked_svg__d" mask-type="alpha">
        <use href="#lord-icon-unlocked_svg__a" />
      </mask>
      <g
        id="lord-icon-unlocked_svg__a"
        clipPath="url(#lord-icon-unlocked_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <path
          fillOpacity={0}
          stroke="#08A88A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.5}
          d="m-21.485-8.105.007-19.621c.004-9.934-8.059-17.995-17.993-17.989l-3.029.002c-9.934.006-18.013 7.152-18.029 15.946l-.029 15.936"
          style={{
            display: 'block',
          }}
          transform="matrix(3.6 0 0 3.6 311.2 268)"
        />
        <path
          fillOpacity={0}
          stroke="#08A88A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.5}
          d="M28.456 23.866c-.002 6.07-4.933 11-11.004 11h-34.904c-6.07 0-11.002-4.93-11.004-11l-.007-20.616c-.002-6.07 0-11.08.004-11.177 0 0 0 0 0 0a.196.196 0 0 1 .186-.184s0 0 0 0c.099-.003 5.108-.006 11.179-.006h34.125c6.07 0 11.094.003 11.21.006 0 0 0 0 0 0 .117.003.214.092.218.199 0 0 0 0 0 0 .005.107.006 5.122.004 11.193l-.007 20.585z"
          style={{
            display: 'block',
          }}
          transform="matrix(3.6 0 0 3.6 311.2 268)"
        />
        <g
          style={{
            display: 'block',
          }}
        >
          <path
            fill="red"
            d="M280.362 315.853c0-16.762 13.609-30.371 30.37-30.371 16.761 0 30.37 13.609 30.37 30.371s-13.609 30.371-30.37 30.371c-16.761 0-30.37-13.609-30.37-30.371z"
          />
          <path
            fillOpacity={0}
            stroke="#08A88A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={12.6}
            d="M280.362 315.853c0-16.762 13.609-30.371 30.37-30.371 0 0 0 0 0 0 16.761 0 30.37 13.609 30.37 30.371 0 0 0 0 0 0 0 16.762-13.609 30.371-30.37 30.371 0 0 0 0 0 0-16.761 0-30.37-13.609-30.37-30.371 0 0 0 0 0 0z"
          />
        </g>
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-unlocked_svg__c)"
      mask="url(#lord-icon-unlocked_svg__d)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-unlocked_svg__e)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#00B39E"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-unlocked_svg__design"
        />
        <path
          fill="#068BDF"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-unlocked_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconUnlocked;
