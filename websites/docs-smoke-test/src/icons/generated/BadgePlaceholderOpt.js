import * as React from 'react';
const SvgBadgePlaceholderOpt = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={300}
    viewBox="0 0 300 300"
    {...props}
  >
    <defs>
      <clipPath id="badge-placeholder-opt_svg__a">
        <path d="M0 0h300v300H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#badge-placeholder-opt_svg__a)">
      <g
        data-name="Ellipse 1"
        transform="translate(28 28)"
        fill="none"
        stroke="#ee7e39"
        strokeWidth={10}
      >
        <circle cx={122.5} cy={122.5} r={122.5} stroke="none" />
        <circle cx={122.5} cy={122.5} r={117.5} />
      </g>
      <text
        transform="translate(150 185)"
        fill="#ee7e39"
        fontSize={100}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={-95.752} y={0}>
          {'OPT'}
        </tspan>
      </text>
    </g>
  </svg>
);
export default SvgBadgePlaceholderOpt;
