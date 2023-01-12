import * as React from 'react';
const SvgCardBannerOss = (props) => (
  <svg
    width={324}
    height={80}
    viewBox="0 0 324 80"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    {...props}
  >
    <defs>
      <linearGradient
        x1="0%"
        y1="50.692%"
        x2="100%"
        y2="49.459%"
        id="card-banner-oss_svg__e"
      >
        <stop stopColor="#0087EB" offset="0%" />
        <stop stopColor="#6BBFFF" offset="100%" />
      </linearGradient>
      <filter
        x="-.7%"
        y="-6%"
        width="101.4%"
        height="112%"
        filterUnits="objectBoundingBox"
        id="card-banner-oss_svg__b"
      >
        <feOffset dy={2} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation={2}
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <rect
        id="card-banner-oss_svg__a"
        x={0}
        y={0}
        width={324}
        height={80}
        rx={6}
      />
      <path id="card-banner-oss_svg__d" d="M0 0h1700v200H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="card-banner-oss_svg__c" fill="#fff">
        <use xlinkHref="#card-banner-oss_svg__a" />
      </mask>
      <use fill="#078CDF" xlinkHref="#card-banner-oss_svg__a" />
      <g
        filter="url(#card-banner-oss_svg__b)"
        mask="url(#card-banner-oss_svg__c)"
      >
        <g transform="translate(-774 -120)">
          <mask id="card-banner-oss_svg__f" fill="#fff">
            <use xlinkHref="#card-banner-oss_svg__d" />
          </mask>
          <use
            fill="url(#card-banner-oss_svg__e)"
            xlinkHref="#card-banner-oss_svg__d"
          />
          <g fill="#FFF" mask="url(#card-banner-oss_svg__f)">
            <path d="m1032.527 164.585-41.365-20.555-.162.333L1032.527 165l.081-.04L1074 144.334l-.162-.334zM1033.1 219h.8v-54h-.8zM973.447 162.04 932 182.314v54.37l.102.05L973.527 257l18.663-9.128v-27.1l22.81-11.158v-27.328l-.102-.05L973.528 162l-.081.04Zm-41.08 74.418v-53.916l41.16-20.136 41.106 20.107v26.874l-22.81 11.158v27.1l-18.296 8.95-41.16-20.137Z" />
            <path d="m973.527 202.585-41.365-20.555-.162.333L973.527 203l.082-.04L1015 182.334l-.163-.334z" />
            <path d="m1032.527 124-.08.04L991 144.314v27.27l.103.05 22.707 11.108v27.1l.102.05 18.615 9.107.081-.04L1074 198.714v-54.428l-.103-.05-41.37-20.236Zm-18.35 85.617v-27.1l-.103-.051-22.707-11.107v-26.817l41.16-20.136 41.106 20.107v53.974l-41.106 20.107-18.35-8.977ZM973.1 143h.8V89h-.8z" />
            <path d="M972.527 67.074 953.993 58 931 69.257v54.412l.103.05L972.527 144l.081-.04L1014 123.698v-54.47l-.103-.05L991.063 58l-18.536 9.074Zm18.536-8.667 22.57 11.048v54.016l-41.106 20.122-41.16-20.15V69.483l22.626-11.077 18.534 9.073 18.536-9.073ZM811.055 186.17l-83.726-41.11-.329.666L811.055 187l.164-.08L895 145.667l-.329-.668zM812.199 296h1.602V187h-1.602zM691.892 181.08 608 222.057v109.884l.207.101L692.055 373l37.776-18.449v-54.769L776 277.23v-55.231l-.207-.102L692.055 181l-.163.08Zm-83.148 150.404V222.516l83.311-40.696 83.202 40.637v54.314l-46.17 22.552v54.769l-37.032 18.088-83.311-40.696Z" />
            <path d="m811.055 104-.164.08L727 145.057v55.115l.208.1 45.961 22.45v54.771l.207.101L811.056 296l.163-.08L895 255V145l-.208-.101L811.055 104Zm-37.143 173.036v-54.771l-.207-.103-45.961-22.447v-54.199l83.311-40.696 83.201 40.637v109.085l-83.2 40.637-37.144-18.143Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgCardBannerOss;
