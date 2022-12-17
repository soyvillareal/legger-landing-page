import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
const Landing = React.lazy(() => import("../scenes/Landing/Landing"));
const Leads = React.lazy(() => import("../scenes/Leads/Leads"));

export const routes = {
  LANDING: "/",
  LEADS: "/leads",
};

const BaseRoutes = () => {
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;

  React.useEffect(() => {
    return () => {
      if (history.action !== "POP") {
        window.scrollTo(0, 0);
      }
    };
  }, [location, history]);

  return (
    <Switch location={background || location}>
      <Route path={routes.LANDING} exact component={Landing} />
      <Route path={routes.LEADS} exact component={Leads} />
    </Switch>
  );
};

export default BaseRoutes;
