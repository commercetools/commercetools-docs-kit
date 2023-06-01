import * as React from 'react';
import { SVGProps } from 'react';
const SvgTutorials = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    viewBox="0 0 80 80"
    {...props}
  >
    <g fill="#003037" fillRule="nonzero">
      <path d="M69.087 19H9.913C5.54 19.011 2 22.542 2 26.892v39.236c.011 4.343 3.548 7.86 7.913 7.872h59.174c4.365-.011 7.902-3.529 7.913-7.872V26.892c0-4.35-3.54-7.88-7.913-7.892Zm5.227 47.128c-.011 2.867-2.345 5.189-5.227 5.2H9.913c-2.882-.011-5.216-2.333-5.227-5.2V26.892c0-2.875 2.337-5.209 5.227-5.22h59.174c2.89.011 5.227 2.345 5.227 5.22v39.236Z" />
      <path d="m32 59 20-12-20-12v24Zm2.695-19.338L46.853 47l-12.158 7.358V39.662ZM15 6h48v3H15z" />
    </g>
  </svg>
);
export default SvgTutorials;
