import * as React from 'react';
const SvgCardBannerDefault = (props) => (
  <svg
    width={324}
    height={80}
    viewBox="0 0 324 80"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <linearGradient
        x1="0%"
        y1="50.692%"
        x2="100%"
        y2="49.459%"
        id="card-banner-default_svg__d"
      >
        <stop stopColor="#D1D1D1" offset="0%" />
        <stop stopColor="#EFEFEF" offset="100%" />
      </linearGradient>
      <rect
        id="card-banner-default_svg__a"
        x={0}
        y={0}
        width={324}
        height={80}
        rx={6}
      />
      <path id="card-banner-default_svg__c" d="M0 0h1700v200H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="card-banner-default_svg__b" fill="#fff">
        <use xlinkHref="#card-banner-default_svg__a" />
      </mask>
      <use fill="#078CDF" xlinkHref="#card-banner-default_svg__a" />
      <g mask="url(#card-banner-default_svg__b)">
        <g transform="translate(-775 -114)">
          <mask id="card-banner-default_svg__e" fill="#fff">
            <use xlinkHref="#card-banner-default_svg__c" />
          </mask>
          <use
            fill="url(#card-banner-default_svg__d)"
            xlinkHref="#card-banner-default_svg__c"
          />
          <g fill="#FFF" mask="url(#card-banner-default_svg__e)">
            <path d="m1031.527 160.585-41.365-20.555-.162.333L1031.527 161l.081-.04L1073 140.334l-.162-.334zM1032.1 215h.8v-54h-.8zM972.447 158.04 931 178.314v54.37l.102.05L972.527 253l18.663-9.128v-27.1l22.81-11.158v-27.328l-.102-.05L972.528 158l-.081.04Zm-41.08 74.418v-53.916l41.16-20.136 41.106 20.107v26.874l-22.81 11.158v27.1l-18.296 8.95-41.16-20.137Z" />
            <path d="m972.527 198.585-41.365-20.555-.162.333L972.527 199l.082-.04L1014 178.334l-.163-.334z" />
            <path d="m1031.527 120-.08.04L990 140.314v27.27l.103.05 22.707 11.108v27.1l.102.05 18.615 9.107.081-.04L1073 194.714v-54.428l-.103-.05-41.37-20.236Zm-18.35 85.617v-27.1l-.103-.051-22.707-11.107v-26.817l41.16-20.136 41.106 20.107v53.974l-41.106 20.107-18.35-8.977ZM972.1 139h.8V85h-.8z" />
            <path d="M971.527 63.074 952.993 54 930 65.257v54.412l.103.05L971.527 140l.081-.04L1013 119.698v-54.47l-.103-.05L990.063 54l-18.536 9.074Zm18.536-8.667 22.57 11.048v54.016l-41.106 20.122-41.16-20.15V65.483l22.626-11.077 18.534 9.073 18.536-9.073ZM810.055 182.17l-83.726-41.11-.329.666L810.055 183l.164-.08L894 141.667l-.329-.668zM811.199 292h1.602V183h-1.602z" />
            <path d="m810.055 100-.164.08L726 141.057v55.115l.208.1 45.961 22.45v54.771l.207.101L810.056 292l.163-.08L894 251V141l-.208-.101L810.055 100Zm-37.143 173.036v-54.771l-.207-.103-45.961-22.447v-54.199l83.311-40.696 83.201 40.637v109.085l-83.2 40.637-37.144-18.143Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgCardBannerDefault;
