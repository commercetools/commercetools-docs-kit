import styled from '@emotion/styled';
import {
  GRID_ID_EMPTY,
  GRID_ID_GLOBAL_NOTIFICATION,
  GRID_ID_PAGE_CONTENT,
  GRID_ID_PAGE_NAVIGATION,
  GRID_ID_ROW_ONE,
  GRID_ID_ROW_TWO,
  GRID_ID_ROW_THREE,
  GRID_ID_PAGE_HEADER,
  GRID_ID_PAGE_HEADER_SIDE,
} from './layout-design-config';
import { getPageLayoutGridStyles } from './layout-design-utils';

// definition of rows used in LayoutPage Component
const gridRows = `
  [${GRID_ID_ROW_ONE.start}] '${GRID_ID_GLOBAL_NOTIFICATION} ${GRID_ID_EMPTY}' auto [${GRID_ID_ROW_ONE.end}]
  [${GRID_ID_ROW_TWO.start}] '${GRID_ID_PAGE_HEADER} ${GRID_ID_PAGE_HEADER_SIDE}' auto [${GRID_ID_ROW_TWO.end}]
  [${GRID_ID_ROW_THREE.start}] '${GRID_ID_PAGE_CONTENT} ${GRID_ID_PAGE_NAVIGATION}' 1fr [${GRID_ID_ROW_THREE.end}]
`;

const LayoutPage = styled.div`
  ${(props) =>
    getPageLayoutGridStyles({
      gridRows,
      isReleaseNotesPage: props.isReleaseNotesPage,
      allowWideContentLayout: props.allowWideContentLayout,
    })}
`;

export default LayoutPage;
