import * as React from 'react';
const SvgCardBannerApi = (props) => (
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
        id="card-banner-api_svg__d"
      >
        <stop stopColor="#FFC100" offset="0%" />
        <stop stopColor="#FFE137" offset="100%" />
      </linearGradient>
      <rect
        id="card-banner-api_svg__a"
        x={0}
        y={0}
        width={324}
        height={80}
        rx={6}
      />
      <path id="card-banner-api_svg__c" d="M0 0h1700v200H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="card-banner-api_svg__b" fill="#fff">
        <use xlinkHref="#card-banner-api_svg__a" />
      </mask>
      <use fill="#078CDF" xlinkHref="#card-banner-api_svg__a" />
      <g mask="url(#card-banner-api_svg__b)">
        <g transform="translate(-790 -120)">
          <mask id="card-banner-api_svg__e" fill="#fff">
            <use xlinkHref="#card-banner-api_svg__c" />
          </mask>
          <use
            fill="url(#card-banner-api_svg__d)"
            xlinkHref="#card-banner-api_svg__c"
          />
          <g fill="#FFF" mask="url(#card-banner-api_svg__e)">
            <path d="m1049.527 152.585-41.365-20.555-.162.333L1049.527 153l.081-.04L1091 132.334l-.162-.334zM1050.1 207h.8v-54h-.8zM990.447 150.04 949 170.314v54.37l.102.05L990.527 245l18.663-9.128v-27.1l22.81-11.158v-27.328l-.102-.05L990.528 150l-.081.04Zm-41.08 74.418v-53.916l41.16-20.136 41.106 20.107v26.874l-22.81 11.158v27.1l-18.296 8.95-41.16-20.137Z" />
            <path d="m990.527 190.585-41.365-20.555-.162.333L990.527 191l.082-.04L1032 170.334l-.163-.334zM990.1 245h.8v-54h-.8z" />
            <path d="m1049.527 112-.08.04L1008 132.314v27.27l.103.05 22.707 11.108v27.1l.102.05 18.615 9.107.081-.04L1091 186.714v-54.428l-.103-.05-41.37-20.236Zm-18.35 85.617v-27.1l-.103-.051-22.707-11.107v-26.817l41.16-20.136 41.106 20.107v53.974l-41.106 20.107-18.35-8.977Z" />
            <path d="M1049.527 207.074 1030.993 198 1008 209.257v54.412l.103.05L1049.527 284l.081-.04L1091 263.698v-54.47l-.103-.05L1068.063 198l-18.536 9.074Zm18.536-8.667 22.57 11.048v54.016l-41.106 20.122-41.16-20.15v-53.959l22.626-11.077 18.534 9.073 18.536-9.073ZM990.1 131h.8V77h-.8z" />
            <path d="M989.527 55.074 970.993 46 948 57.257v54.412l.103.05L989.527 132l.081-.04L1031 111.698v-54.47l-.103-.05L1008.063 46l-18.536 9.074Zm18.536-8.667 22.57 11.048v54.016l-41.106 20.122-41.16-20.15V57.483l22.626-11.077 18.534 9.073 18.536-9.073ZM828.055 174.17l-83.726-41.11-.329.666L828.055 175l.164-.08L912 133.667l-.329-.668zM829.199 284h1.602V175h-1.602zM708.892 169.08 625 210.057v109.884l.207.101L709.055 361l37.776-18.449v-54.769L793 265.23v-55.231l-.207-.102L709.055 169l-.163.08Zm-83.148 150.404V210.516l83.311-40.696 83.202 40.637v54.314l-46.17 22.552v54.769l-37.032 18.088-83.311-40.696Z" />
            <path d="m828.055 92-.164.08L744 133.057v55.115l.208.1 45.961 22.45v54.771l.207.101L828.056 284l.163-.08L912 243V133l-.208-.101L828.055 92Zm-37.143 173.036v-54.771l-.207-.103-45.961-22.447v-54.199l83.311-40.696 83.201 40.637v109.085l-83.2 40.637-37.144-18.143Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
export default SvgCardBannerApi;
