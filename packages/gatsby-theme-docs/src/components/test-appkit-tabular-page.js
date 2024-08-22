import { Routes, Route, useLocation } from 'react-router-dom';
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

const TabPage = () => {
  const { pathname } = useLocation();

  return (
    <TabularMainPage
      title="Main page"
      tabControls={
        <>
          <TabHeader to={`${pathname}/tab-one`} label="Tab One" />
          <TabHeader to={`${pathname}/tab-two`} label="Tab Two" />
        </>
      }
    >
      <Routes>
        <Route
          path={`${pathname}/tab-one`}
          element={<div>first tab</div>}
        ></Route>
        <Route
          path={`${pathname}/tab-two`}
          element={<div>second tab</div>}
        ></Route>
      </Routes>
    </TabularMainPage>
  );
};

export default TabPage;
