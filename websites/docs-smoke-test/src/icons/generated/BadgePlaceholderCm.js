import * as React from 'react';
const SvgBadgePlaceholderCm = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={300}
    viewBox="0 0 300 300"
    {...props}
  >
    <defs>
      <clipPath id="badge-placeholder-cm_svg__a">
        <path d="M0 0h300v300H0z" />
      </clipPath>
    </defs>
    <g
      data-name="Badge-placeholder-CM \u2013 1"
      clipPath="url(#badge-placeholder-cm_svg__a)"
    >
      <g
        data-name="Ellipse 1"
        transform="translate(28 28)"
        fill="none"
        stroke="#ffd007"
        strokeWidth={10}
      >
        <circle cx={122.5} cy={122.5} r={122.5} stroke="none" />
        <circle cx={122.5} cy={122.5} r={117.5} />
      </g>
      <text
        transform="translate(150 185)"
        fill="#ffd007"
        fontSize={100}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={-76.196} y={0}>
          {'CM'}
        </tspan>
      </text>
    </g>
  </svg>
);
export default SvgBadgePlaceholderCm;
