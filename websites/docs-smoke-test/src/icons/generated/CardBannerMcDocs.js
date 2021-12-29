import * as React from 'react';

function SvgCardBannerMcDocs(props) {
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
        <path id="card-banner-mc-docs_svg__c" d="M0 0h1700v200H0z" />
        <path id="card-banner-mc-docs_svg__f" d="M0 0h32v36H0z" />
        <path id="card-banner-mc-docs_svg__h" d="M0 0h130v148H0z" />
        <path id="card-banner-mc-docs_svg__j" d="M0 0h192v219H0z" />
        <path id="card-banner-mc-docs_svg__l" d="M0 0h148v169H0z" />
        <linearGradient
          x1="0%"
          y1="50.692%"
          x2="100%"
          y2="49.427%"
          id="card-banner-mc-docs_svg__d"
        >
          <stop stopColor="#325A67" offset="0%" />
          <stop stopColor="#437889" offset="100%" />
        </linearGradient>
        <rect
          id="card-banner-mc-docs_svg__a"
          x={0}
          y={0}
          width={324}
          height={80}
          rx={6}
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="card-banner-mc-docs_svg__b" fill="#fff">
          <use xlinkHref="#card-banner-mc-docs_svg__a" />
        </mask>
        <use fill="#078CDF" xlinkHref="#card-banner-mc-docs_svg__a" />
        <g mask="url(#card-banner-mc-docs_svg__b)">
          <g transform="translate(-676 -28)">
            <mask id="card-banner-mc-docs_svg__e" fill="#fff">
              <use xlinkHref="#card-banner-mc-docs_svg__c" />
            </mask>
            <use
              fill="url(#card-banner-mc-docs_svg__d)"
              xlinkHref="#card-banner-mc-docs_svg__c"
            />
            <g mask="url(#card-banner-mc-docs_svg__e)">
              <g
                opacity={0.143}
                style={{
                  mixBlendMode: 'overlay',
                }}
                transform="translate(752 42)"
              >
                <mask id="card-banner-mc-docs_svg__g" fill="#fff">
                  <use xlinkHref="#card-banner-mc-docs_svg__f" />
                </mask>
                <path
                  d="M32 28.213c0 .433-.235.833-.616 1.05l-14.768 6.575c-.381.216-.85.216-1.232 0L.616 29.263A1.21 1.21 0 010 28.213V7.788c0-.434.235-.834.616-1.05L15.384.162c.381-.217.85-.217 1.232 0l14.768 6.574c.381.217.616.617.616 1.05v20.426z"
                  fill="#FFF"
                  mask="url(#card-banner-mc-docs_svg__g)"
                />
              </g>
              <g
                opacity={0.078}
                style={{
                  mixBlendMode: 'overlay',
                }}
                transform="translate(826 -97)"
              >
                <mask id="card-banner-mc-docs_svg__i" fill="#fff">
                  <use xlinkHref="#card-banner-mc-docs_svg__h" />
                </mask>
                <path
                  d="M130 115.985c0 1.78-.954 3.426-2.502 4.317l-59.996 27.03a5.02 5.02 0 01-5.004 0l-59.996-27.03A4.981 4.981 0 010 115.985v-83.97c0-1.78.954-3.426 2.502-4.317L62.498.668a5.017 5.017 0 015.004 0l59.996 27.03A4.982 4.982 0 01130 32.015v83.97z"
                  fill="#FFF"
                  mask="url(#card-banner-mc-docs_svg__i)"
                />
              </g>
              <g opacity={0.073} transform="translate(713 45)">
                <mask id="card-banner-mc-docs_svg__k" fill="#fff">
                  <use xlinkHref="#card-banner-mc-docs_svg__j" />
                </mask>
                <path
                  d="M192 171.626a7.373 7.373 0 01-3.695 6.388l-88.61 39.998a7.403 7.403 0 01-7.39 0l-88.61-39.998A7.374 7.374 0 010 171.626V47.374a7.376 7.376 0 013.695-6.388L92.305.989a7.398 7.398 0 017.39 0l88.61 39.997A7.375 7.375 0 01192 47.374v124.252z"
                  fill="#FFF"
                  mask="url(#card-banner-mc-docs_svg__k)"
                />
              </g>
              <g transform="translate(880 3)" opacity={0.137}>
                <mask id="card-banner-mc-docs_svg__m" fill="#fff">
                  <use xlinkHref="#card-banner-mc-docs_svg__l" />
                </mask>
                <path
                  d="M148 132.442a5.69 5.69 0 01-2.849 4.93l-68.303 30.866a5.701 5.701 0 01-5.696 0L2.848 137.37A5.691 5.691 0 010 132.442V36.558a5.693 5.693 0 012.848-4.93L71.152.763a5.697 5.697 0 015.696 0l68.303 30.865a5.693 5.693 0 012.849 4.93v95.884z"
                  fill="#FFF"
                  mask="url(#card-banner-mc-docs_svg__m)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgCardBannerMcDocs;
