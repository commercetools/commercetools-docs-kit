import * as React from 'react';

function SvgSlash(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="slash_svg__App-KIT-FInal"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="slash_svg__Search-03-/-Text-Copy"
          transform="translate(-1237 -16)"
        >
          <g id="slash_svg__Search" transform="translate(964 11)">
            <g id="slash_svg__Slash_icon" transform="translate(273 5)">
              <rect
                id="slash_svg__Rectangle"
                stroke="#CCC"
                x={0.5}
                y={0.5}
                width={15}
                height={15}
                rx={2}
              />
              <path
                id="slash_svg__/"
                fill="#999"
                fillRule="nonzero"
                d="M7.211 12l2.657-7.139h-1.08L6.129 12z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgSlash;
