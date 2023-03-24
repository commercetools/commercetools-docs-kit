import * as React from 'react';
const SvgBadgePlaceholderSm = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={300}
    viewBox="0 0 300 300"
    {...props}
  >
    <defs>
      <clipPath id="badge-placeholder-sm_svg__a">
        <path d="M0 0h300v300H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#badge-placeholder-sm_svg__a)">
      <g
        data-name="Ellipse 1"
        transform="translate(28 28)"
        fill="none"
        stroke="#00e0bb"
        strokeWidth={10}
      >
        <circle cx={122.5} cy={122.5} r={122.5} stroke="none" />
        <circle cx={122.5} cy={122.5} r={117.5} />
      </g>
      <text
        transform="translate(150 185)"
        fill="#00dcbc"
        fontSize={100}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={-73.315} y={0}>
          {'SM'}
        </tspan>
      </text>
    </g>
  </svg>
);
export default SvgBadgePlaceholderSm;
