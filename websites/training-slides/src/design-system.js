import { designSystem } from '@commercetools-docs/ui-kit';

/* at 1920*1080 0.834vw equals 16px. This way the design can be done in pixels
and the actual font size will scale with the window because the html attribute has a vw (% of viewport width)
based root font size set. All sizing in the implementation has to be implemented in rem units, so that the
complete design fluidly scales with window / projector size.
To translate the pixel based design input, a pixel-to-rem helper can be used in the implementation. */
const viewportWidthPerRemAtFullHD = 0.834;
const baseFontSize = `${2 * viewportWidthPerRemAtFullHD}vw`; // equals a 960px wide design

const horizontalElements = 16;
const verticalElements = 9;
const sideBarElements = 1;
const widthToHeight = horizontalElements / verticalElements;
const heightToWidth = verticalElements / horizontalElements;

export default {
  ...designSystem,
  slideLayout: {
    baseFontSize,
    horizontalElements,
    verticalElements,
    widthToHeight,
    sideBarElements,
    contentAreaWidth: `${100 - sideBarElements * (100 / horizontalElements)}vw`,
    contentAreaHeight: `${heightToWidth * 100}vw`,
  },
};
