import * as React from 'react';

function SvgCardBannerOss(props) {
  return (
    <svg
      width={324}
      height={80}
      viewBox="0 0 324 80"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path id="card-banner-oss_svg__path-4" d="M0 0h1920v200H0z" />
        <path id="card-banner-oss_svg__path-6" d="M0 0h192v219H0z" />
        <path id="card-banner-oss_svg__path-8" d="M0 0h148v169H0z" />
        <linearGradient
          x1="0%"
          y1="50.543%"
          x2="100%"
          y2="49.576%"
          id="card-banner-oss_svg__linearGradient-3"
        >
          <stop stopColor="gray" offset="0%" />
          <stop stopColor="#B3B3B3" offset="100%" />
        </linearGradient>
        <rect
          id="card-banner-oss_svg__path-1"
          x={0}
          y={0}
          width={324}
          height={80}
          rx={6}
        />
      </defs>
      <g
        id="card-banner-oss_svg__Page-1"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="card-banner-oss_svg__Color-Scheme----Banner-/-All"
          transform="translate(-952 -284)"
        >
          <g id="card-banner-oss_svg__Grey" transform="translate(952 284)">
            <mask id="card-banner-oss_svg__mask-2" fill="#fff">
              <use xlinkHref="#card-banner-oss_svg__path-1" />
            </mask>
            <use
              id="card-banner-oss_svg__Mask"
              fill="#078CDF"
              xlinkHref="#card-banner-oss_svg__path-1"
            />
            <g mask="url(#card-banner-oss_svg__mask-2)">
              <g transform="translate(-913 -70)">
                <mask id="card-banner-oss_svg__mask-5" fill="#fff">
                  <use xlinkHref="#card-banner-oss_svg__path-4" />
                </mask>
                <use
                  id="card-banner-oss_svg__bg-Open-Source"
                  stroke="none"
                  fill="url(#card-banner-oss_svg__linearGradient-3)"
                  fillRule="evenodd"
                  xlinkHref="#card-banner-oss_svg__path-4"
                />
                <g
                  id="card-banner-oss_svg__bg-pattern-1"
                  stroke="none"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                  mask="url(#card-banner-oss_svg__mask-5)"
                >
                  <g transform="translate(872 -153)">
                    <g
                      id="card-banner-oss_svg__hex-3"
                      opacity={0.073}
                      transform="translate(57 198)"
                    >
                      <mask id="card-banner-oss_svg__mask-7" fill="#fff">
                        <use xlinkHref="#card-banner-oss_svg__path-6" />
                      </mask>
                      <path
                        d="M192 171.626a7.373 7.373 0 01-3.695 6.388l-88.61 39.998a7.403 7.403 0 01-7.39 0l-88.61-39.998A7.374 7.374 0 010 171.626V47.374a7.376 7.376 0 013.695-6.388L92.305.989a7.398 7.398 0 017.39 0l88.61 39.997A7.375 7.375 0 01192 47.374v124.252z"
                        id="card-banner-oss_svg__Fill-1"
                        fill="#FFF"
                        mask="url(#card-banner-oss_svg__mask-7)"
                      />
                    </g>
                    <g
                      id="card-banner-oss_svg__hexagons"
                      transform="translate(128 108)"
                      opacity={0.137}
                    >
                      <g id="card-banner-oss_svg__hex-3-copy-2">
                        <mask id="card-banner-oss_svg__mask-9" fill="#fff">
                          <use xlinkHref="#card-banner-oss_svg__path-8" />
                        </mask>
                        <path
                          d="M148 132.442a5.69 5.69 0 01-2.849 4.93l-68.303 30.866a5.701 5.701 0 01-5.696 0L2.848 137.37A5.691 5.691 0 010 132.442V36.558a5.693 5.693 0 012.848-4.93L71.152.763a5.697 5.697 0 015.696 0l68.303 30.865a5.693 5.693 0 012.849 4.93v95.884z"
                          id="card-banner-oss_svg__Fill-1"
                          fill="#FFF"
                          mask="url(#card-banner-oss_svg__mask-9)"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgCardBannerOss;
