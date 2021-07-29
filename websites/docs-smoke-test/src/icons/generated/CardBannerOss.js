import * as React from 'react';

function SvgCardBannerOss(props) {
  return (
    <svg
      viewBox="0 0 324 80"
      width={324}
      height={80}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path id="card-banner-oss_svg__c" d="M0 0h1920v200H0z" />
        <path id="card-banner-oss_svg__f" d="M0 0h192v219H0z" />
        <path id="card-banner-oss_svg__h" d="M0 0h148v169H0z" />
        <linearGradient
          x1="0%"
          y1="50.543%"
          x2="100%"
          y2="49.576%"
          id="card-banner-oss_svg__d"
        >
          <stop stopColor="gray" offset="0%" />
          <stop stopColor="#B3B3B3" offset="100%" />
        </linearGradient>
        <rect
          id="card-banner-oss_svg__a"
          x={0}
          y={0}
          width={324}
          height={80}
          rx={6}
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="card-banner-oss_svg__b" fill="#fff">
          <use xlinkHref="#card-banner-oss_svg__a" />
        </mask>
        <use fill="#078CDF" xlinkHref="#card-banner-oss_svg__a" />
        <g mask="url(#card-banner-oss_svg__b)">
          <g transform="translate(-913 -70)">
            <mask id="card-banner-oss_svg__e" fill="#fff">
              <use xlinkHref="#card-banner-oss_svg__c" />
            </mask>
            <use
              fill="url(#card-banner-oss_svg__d)"
              xlinkHref="#card-banner-oss_svg__c"
            />
            <g mask="url(#card-banner-oss_svg__e)">
              <g opacity={0.073} transform="translate(929 45)">
                <mask id="card-banner-oss_svg__g" fill="#fff">
                  <use xlinkHref="#card-banner-oss_svg__f" />
                </mask>
                <path
                  d="M192 171.626a7.373 7.373 0 01-3.695 6.388l-88.61 39.998a7.403 7.403 0 01-7.39 0l-88.61-39.998A7.374 7.374 0 010 171.626V47.374a7.376 7.376 0 013.695-6.388L92.305.989a7.398 7.398 0 017.39 0l88.61 39.997A7.375 7.375 0 01192 47.374v124.252z"
                  fill="#FFF"
                  mask="url(#card-banner-oss_svg__g)"
                />
              </g>
              <g transform="translate(1000 -45)" opacity={0.137}>
                <mask id="card-banner-oss_svg__i" fill="#fff">
                  <use xlinkHref="#card-banner-oss_svg__h" />
                </mask>
                <path
                  d="M148 132.442a5.69 5.69 0 01-2.849 4.93l-68.303 30.866a5.701 5.701 0 01-5.696 0L2.848 137.37A5.691 5.691 0 010 132.442V36.558a5.693 5.693 0 012.848-4.93L71.152.763a5.697 5.697 0 015.696 0l68.303 30.865a5.693 5.693 0 012.849 4.93v95.884z"
                  fill="#FFF"
                  mask="url(#card-banner-oss_svg__i)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgCardBannerOss;
