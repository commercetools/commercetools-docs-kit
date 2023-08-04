import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDocument = (props: SVGProps<SVGSVGElement>) => (
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
      <clipPath id="j">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="e">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="h">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <clipPath id="g">
        <path d="M0 0h500v500H0z" />
      </clipPath>
      <mask id="i" mask-type="alpha">
        <use href="#a" />
      </mask>
      <mask id="f" mask-type="alpha">
        <g filter="url(#b)">
          <path fill="#fff" d="M0 0h500v500H0z" opacity={0} />
          <use href="#c" />
        </g>
      </mask>
      <mask id="k" mask-type="alpha">
        <use href="#d" />
      </mask>
      <g
        id="d"
        clipPath="url(#e)"
        style={{
          display: 'block',
        }}
      >
        <g
          mask="url(#f)"
          style={{
            display: 'block',
          }}
        >
          <g
            fillOpacity={0}
            stroke="#08A88A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3.5}
            clipPath="url(#g)"
            transform="translate(-.751 .001)"
          >
            <path
              d="M-16.959-19.849H20.2"
              style={{
                display: 'block',
              }}
              transform="matrix(3.7 0 0 3.7 245.375 425.288)"
            />
            <path
              d="M-16.959-19.849H20.2"
              style={{
                display: 'block',
              }}
              transform="matrix(3.7 0 0 3.7 245.375 373.488)"
            />
            <path
              d="M-16.959-19.849H20.2"
              style={{
                display: 'block',
              }}
              transform="matrix(3.7 0 0 3.7 245.375 321.688)"
            />
            <path
              d="M-16.959-19.849H20.2"
              style={{
                display: 'block',
              }}
              transform="matrix(3.7 0 0 3.7 245.375 269.888)"
            />
          </g>
        </g>
        <g
          fillOpacity={0}
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#h)"
          mask="url(#i)"
          style={{
            display: 'none',
          }}
        >
          <path
            style={{
              display: 'none',
            }}
          />
          <path
            style={{
              display: 'none',
            }}
          />
          <path
            style={{
              display: 'none',
            }}
          />
          <path
            style={{
              display: 'none',
            }}
          />
        </g>
        <path
          fillOpacity={0}
          stroke="#08A88A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.5}
          d="M28.966 43.958h-57.932v-86.963h41.893l8.02 8.02 8.019 8.019v70.924z"
          style={{
            display: 'block',
          }}
          transform="matrix(3.7 0 0 3.7 248.149 251.85)"
        />
        <path
          fillOpacity={0}
          stroke="#08A88A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.5}
          d="M-15.898 43.958h-13.068V28.989"
          style={{
            display: 'block',
          }}
          transform="matrix(3.7 0 0 3.7 403.549 -12.7)"
        />
        <path
          fillOpacity={0}
          stroke="#08A88A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3.5}
          d="M0 0"
          style={{
            display: 'block',
          }}
          transform="matrix(3.7 0 0 3.7 558.949 -277.25)"
        />
        <g
          style={{
            display: 'block',
          }}
        >
          <path d="M299.915 96.3h-3.5l-.25 53h53.5l-.125-3.375L299.915 96.3z" />
          <path
            fillOpacity={0}
            stroke="red"
            strokeWidth={0}
            d="M299.915 96.3h-3.5l-.25 53h53.5l-.125-3.375L299.915 96.3z"
          />
        </g>
      </g>
      <g
        id="a"
        style={{
          display: 'block',
        }}
      >
        <path
          fill="red"
          d="M510.723 149.946H296.374v-321.764H451.38l29.674 29.674 29.67 29.67v262.42z"
        />
        <path
          fillOpacity={0}
          stroke="#131432"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={12.95}
          d="M510.723 149.946H296.374v-321.764H451.38l29.674 29.674 29.67 29.67v262.42z"
        />
      </g>
      <g
        id="c"
        style={{
          display: 'block',
        }}
      >
        <path
          fill="red"
          d="M510.723 149.946H296.374v-321.764H451.38l29.674 29.674 29.67 29.67v262.42z"
        />
        <path
          fillOpacity={0}
          stroke="#131432"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={12.95}
          d="M510.723 149.946H296.374v-321.764H451.38l29.674 29.674 29.67 29.67v262.42z"
        />
      </g>
      <filter
        id="b"
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
      <filter id="l" width="300%" height="300%" x="-100%" y="-100%">
        <feGaussianBlur result="filter_result_0" stdDeviation="52.5 52.5" />
      </filter>
    </defs>
    <g clipPath="url(#j)">
      <g
        mask="url(#k)"
        style={{
          display: 'block',
        }}
      >
        <g filter="url(#l)" transform="rotate(-94 262.075 8.435) scale(2.4)">
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
export default SvgDocument;
