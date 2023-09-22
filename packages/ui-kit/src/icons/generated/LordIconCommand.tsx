import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconCommand = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-command_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-command_svg__d"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-command_svg__c" mask-type="alpha">
        <use href="#lord-icon-command_svg__a" />
      </mask>
      <g
        id="lord-icon-command_svg__a"
        fillOpacity={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          display: 'block',
        }}
      >
        <path
          stroke="#121331"
          strokeWidth={12}
          d="M387.712 410.12H112.288c-12.375 0-22.407-10.033-22.407-22.408V112.288c0-12.375 10.032-22.407 22.407-22.407h275.424c12.375 0 22.407 10.032 22.407 22.407v275.424c0 12.375-10.032 22.408-22.407 22.408zm20.407-268.866H89.881"
        />
        <path
          stroke="#08A88A"
          strokeWidth={18}
          d="M177.864 115.567H178m-56.432 0h.136m28.012 0h.136"
        />
        <path
          stroke="#08A88A"
          strokeWidth={12}
          d="M247.76 328.335H338m-167.996 0 52.648-52.649-52.648-52.649"
        />
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-command_svg__b)"
      mask="url(#lord-icon-command_svg__c)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-command_svg__d)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#00B39E"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-command_svg__design"
        />
        <path
          fill="#068BDF"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-command_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconCommand;
