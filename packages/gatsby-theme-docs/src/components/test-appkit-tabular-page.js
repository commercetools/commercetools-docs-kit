import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';

const TabPage = () => {
  const match = useRouteMatch();

  return (
    <TabularMainPage
      title="Main page"
      tabControls={
        <>
          <TabHeader to={`${match.url}/tab-one`} label="Tab One" />
          <TabHeader to={`${match.url}/tab-two`} label="Tab Two" />
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/tab-one`}>
          <div>First tab</div>
        </Route>
        <Route path={`${match.path}/tab-two`}>
          <div>Second tab</div>
        </Route>
      </Switch>
    </TabularMainPage>
  );
};

export default TabPage;
