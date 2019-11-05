import { withPrefix } from 'gatsby-link';

export default function computePathWithPathPrefix(path) {
  const pathWithPathPrefix = `${withPrefix('')}${path}`;

  // replace any sequence of 2 or more forward slashes with 1 slash
  return pathWithPathPrefix.replace(/\/\/+/g, '/');
}
