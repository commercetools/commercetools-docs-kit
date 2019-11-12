const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const SafeHTMLElement = canUseDOM ? window.HTMLElement : {};

export default SafeHTMLElement;
