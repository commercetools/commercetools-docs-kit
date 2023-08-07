import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLordIconGraduation = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="lord-icon-graduation_svg__c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="lord-icon-graduation_svg__b">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <filter
        id="lord-icon-graduation_svg__e"
        width="300%"
        height="300%"
        x="-100%"
        y="-100%"
      >
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <mask id="lord-icon-graduation_svg__d" mask-type="alpha">
        <use href="#lord-icon-graduation_svg__a" />
      </mask>
      <g
        id="lord-icon-graduation_svg__a"
        fillOpacity={0}
        stroke="#08A88A"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#lord-icon-graduation_svg__b)"
        style={{
          display: 'block',
        }}
      >
        <path
          strokeWidth={12}
          d="m98.395-30.292-.401 86.297S70.507 106.292-9.055 106.034c-80.665-.262-108.846-50.029-108.846-50.029l.401-86.297"
          style={{
            display: 'block',
          }}
          transform="translate(259 271.999)"
        />
        <path
          strokeWidth={12}
          d="M180.44-92.969.021-156.781-179.469-93 .021-29.219l180.419-63.75zm-357.657-.061-2.098-.001-.154 29.031L.021-.219 180.47-64.25s0 0 0 0l.03-28.687-5.922-.002"
          style={{
            display: 'block',
          }}
          transform="translate(249.5 271.999)"
        />
        <g
          style={{
            display: 'block',
          }}
        >
          <path strokeWidth={12} d="m250.5 177.999 77 28v105m0 2.5v10.73" />
          <path strokeWidth={22} d="M327.5 313.499v10.73" />
        </g>
      </g>
    </defs>
    <g
      clipPath="url(#lord-icon-graduation_svg__c)"
      mask="url(#lord-icon-graduation_svg__d)"
      style={{
        display: 'block',
      }}
    >
      <g
        filter="url(#lord-icon-graduation_svg__e)"
        transform="rotate(-94 262.075 8.435) scale(2.4)"
      >
        <path
          fill="#4AE0EB"
          d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
          className="lord-icon-graduation_svg__design"
        />
        <path
          fill="#CA5EED"
          d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
          className="lord-icon-graduation_svg__design"
        />
      </g>
    </g>
  </svg>
);
export default SvgLordIconGraduation;
