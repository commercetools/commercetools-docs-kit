import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconLogin = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-login_svg__f">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-login_svg__d">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-login_svg__a"
        width="100%"
        height="100%"
        x="0%"
        y="0%"
        filterUnits="objectBoundingBox"
      >
        <feComponentTransfer in="SourceGraphic">
          <feFuncA tableValues="1.0 0.0" type="table" />
        </feComponentTransfer>
      </filter>
      <filter
        id="lord-icon-login_svg__h"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-login_svg__e" mask-type="alpha">
        <g filter="url(#lord-icon-login_svg__a)">
          <use href="#b" />
        </g>
      </mask>
      <mask id="lord-icon-login_svg__g" mask-type="alpha">
        <use href="#c" />
      </mask>
      <g
        id="lord-icon-login_svg__c"
        clipPath="url(#lord-icon-login_svg__d)"
        style={{
          display: 'block',
        }}
      >
        <g
          mask="url(#lord-icon-login_svg__e)"
          style={{
            display: 'block',
          }}
        >
          <path
            fillOpacity={0}
            stroke="#00B39E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={12}
            d="m232.6 312.45-62.4-62.4 62.5-62.5m177.7 62.5-239.9-.1"
          />
        </g>
        <path
          fillOpacity={0}
          stroke="#068BDF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={12}
          d="M100.05-53.35v-42.1c0-21-17-38-38-38h-124.1c-21 0-38 17-38 38v190.9c0 21 17 38 38 38h124.1c21 0 38-17 38-38v-42.1"
          style={{
            display: 'block',
          }}
          transform="translate(189.95 250)"
        />
      </g>
      <g
        id="lord-icon-login_svg__b"
        style={{
          display: 'block',
        }}
      >
        <path
          fillOpacity={0}
          stroke="#068BDF"
          strokeWidth={0}
          d="M90 46v409h-357V46H90z"
        />
        <path fill="red" d="M90 46v409h-357V46H90z" />
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-login_svg__f)"
      mask="url(#lord-icon-login_svg__g)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-login_svg__h)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#00B39E"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-login_svg__design"
        />
        <path
          fill="#068BDF"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-login_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconLogin;
