import * as React from 'react';
import { SVGProps } from 'react';

const SvgDocumentationLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={130}
    height={15}
    viewBox="0 0 130 15"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <filter
        x="-1.5%"
        y="-8%"
        width="103%"
        height="116%"
        filterUnits="objectBoundingBox"
        id="documentation-logo_svg__a"
      >
        <feGaussianBlur
          stdDeviation={1.5}
          in="SourceAlpha"
          result="shadowBlurInner1"
        />
        <feOffset dy={1} in="shadowBlurInner1" result="shadowOffsetInner1" />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2={-1}
          k3={1}
          result="shadowInnerInner1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          in="shadowInnerInner1"
        />
      </filter>
      <filter
        x="-1.5%"
        y="-8%"
        width="103%"
        height="116%"
        filterUnits="objectBoundingBox"
        id="documentation-logo_svg__c"
      >
        <feGaussianBlur
          stdDeviation={1.5}
          in="SourceAlpha"
          result="shadowBlurInner1"
        />
        <feOffset dy={1} in="shadowBlurInner1" result="shadowOffsetInner1" />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2={-1}
          k3={1}
          result="shadowInnerInner1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          in="shadowInnerInner1"
        />
      </filter>
      <text
        id="documentation-logo_svg__b"
        fontFamily="TTCommonsPro-Rg, TT Commons Pro"
        fontSize={20}
        fontWeight="normal"
        fill="#1A1A1A"
      >
        <tspan x={36} y={24}>
          {'Documentation'}
        </tspan>
      </text>
    </defs>
    <g transform="translate(-37 -10)" fill="#1A1A1A" fillRule="nonzero">
      <use
        filter="url(#documentation-logo_svg__a)"
        xlinkHref="#documentation-logo_svg__b"
      />
      <use
        filter="url(#documentation-logo_svg__c)"
        xlinkHref="#documentation-logo_svg__b"
      />
    </g>
  </svg>
);

export default SvgDocumentationLogo;
