import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconSpreadsheet = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-spreadsheet_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-spreadsheet_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-spreadsheet_svg__e"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-spreadsheet_svg__d" mask-type="alpha">
        <use href="#lord-icon-spreadsheet_svg__a" />
      </mask>
      <g
        id="lord-icon-spreadsheet_svg__a"
        fillOpacity={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#lord-icon-spreadsheet_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <g
          style={{
            display: 'block',
          }}
        >
          <path
            stroke="#121331"
            strokeWidth={12}
            d="M387.712 410.119H112.288c-12.375 0-22.407-10.032-22.407-22.407V112.288c0-12.375 10.032-22.407 22.407-22.407h275.424c12.375 0 22.407 10.032 22.407 22.407v275.424c0 12.375-10.032 22.407-22.407 22.407zm20.407-268.865H89.881"
          />
          <path
            stroke="#08A789"
            strokeWidth={18}
            d="M180.864 115.567H181m-56.432 0h.136m28.012 0h.136"
          />
        </g>
        <g
          strokeWidth={12}
          style={{
            display: 'block',
          }}
        >
          <path
            stroke="#121331"
            d="M185.5 226.084v146.25m93.125-146.25v146.25m93.125-146.25v146.25h-243.5V226.002"
          />
          <path
            stroke="#08A789"
            d="M128.25 226.084v-48.75h243.5v48.75m0 0h-243.5"
          />
          <path
            stroke="#121331"
            d="M371.75 274.834h-243.5m243.5 48.75h-243.5"
          />
          <path stroke="#08A789" d="M185.5 177.334v48.75m93.126-48.75v48.75" />
        </g>
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-spreadsheet_svg__c)"
      mask="url(#lord-icon-spreadsheet_svg__d)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-spreadsheet_svg__e)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#00B39E"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-spreadsheet_svg__design"
        />
        <path
          fill="#068BDF"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-spreadsheet_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconSpreadsheet;
