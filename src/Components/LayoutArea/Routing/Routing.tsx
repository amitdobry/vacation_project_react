import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Login from "../../LoginArea/Login/Login";
import Register from "../../LoginArea/Register/Register";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import VacationList from "../../VacationArea/VacationList/VacationList";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import ChartComponent from "../../AnalyticsArea/Chart/ChartComponent";
import Page404 from "../../SharedArea/Page404/Page404";
function Router(): JSX.Element {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" />;
        }}
      />
      <Route path="/home" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/vacations" component={VacationList} exact />
      <Route path="/vacations/add" component={AddVacation} exact />
      <Route path="/vacations/edit/:id" component={EditVacation} exact />
      <Route path="/analytics" component={ChartComponent} />
      <Route component={Page404} />
    </Switch>
  );
}

export default Router;
