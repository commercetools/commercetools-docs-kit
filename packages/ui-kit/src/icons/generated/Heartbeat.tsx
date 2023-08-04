import * as React from 'react';
import type { SVGProps } from 'react';
const SvgHeartbeat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
      <clipPath id="f">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="c">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="d">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <mask id="e" mask-type="alpha">
        <use href="#a" />
      </mask>
      <mask id="g" mask-type="alpha">
        <use href="#b" />
      </mask>
      <filter id="h" width="300%" height="300%" x="-100%" y="-100%">
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
      <path
        id="a"
        fill="red"
        d="M250 161.6c19.2-34.81 58.04-55.78 96.64-39.33 0 0 52.18 17.66 48.26 79.43-3.91 61.78-82.8 148.33-144.9 181.73m0-221.83c-19.2-34.81-58.04-55.78-96.64-39.33 0 0-52.18 17.66-48.26 79.43 3.91 61.78 82.8 148.33 144.9 181.73"
        style={{
          display: 'block',
        }}
      />
      <g
        id="b"
        fillOpacity={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#c)"
        style={{
          display: 'block',
        }}
      >
        <g
          clipPath="url(#d)"
          mask="url(#e)"
          style={{
            display: 'block',
          }}
        >
          <path
            stroke="#08A284"
            strokeWidth={12}
            d="m-146.3.186 60.09-.191 14.42 28.83 28.82-57.65 14.42 28.82h57.41l14.42 28.83 28.82-57.65L86.52-.005l58.78-.061"
            style={{
              display: 'block',
            }}
            transform="translate(250 243.318)"
          />
          <path
            style={{
              display: 'none',
            }}
          />
        </g>
        <path
          stroke="#121331"
          strokeWidth={12}
          d="M72.558-88.4c19.201-34.813 58.038-55.777 96.644-39.328 0 0 52.18 17.653 48.261 79.428-3.919 61.775-82.802 148.332-144.905 181.733m0-221.833c-19.201-34.813-58.038-55.777-96.644-39.328 0 0-52.18 17.653-48.261 79.428 3.919 61.775 82.802 148.332 144.905 181.733"
          style={{
            display: 'block',
          }}
          transform="translate(177.442 250)"
        />
      </g>
    </defs>
    <g clipPath="url(#f)">
      <g
        mask="url(#g)"
        style={{
          display: 'block',
        }}
      >
        <g filter="url(#h)" transform="rotate(-94 262.075 8.435) scale(2.4)">
          <path
            fill="#4AE0EB"
            d="M0-250c137.975 0 250 112.025 250 250S137.975 250 0 250-250 137.975-250 0-137.975-250 0-250z"
            className="design"
          />
          <path
            fill="#CA5EED"
            d="M113.242-295.384c97.478 0 176.5 79.022 176.5 176.5s-79.022 176.5-176.5 176.5c-43.948 0-74.396-34.057-105.29-60.631-37.631-32.369-71.21-62.338-71.21-115.869 0-97.478 79.022-176.5 176.5-176.5z"
            className="design"
          />
        </g>
      </g>
      <path
        style={{
          display: 'none',
        }}
      />
    </g>
  </svg>
);
export default SvgHeartbeat;
