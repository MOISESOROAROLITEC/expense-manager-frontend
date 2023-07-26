import React from "react";
import Navigation from "../nav/navigation";
import { Header } from "../header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./main.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="row m-0 p-0 dashboard">
      <Router>
        <div className="left-element d-none d-md-block">
          <Navigation />
        </div>
        <div className="m-0 p-0 right-element">
          <div className="dashboard-header">
            <Header />
          </div>
          <div className="green-3 dashboard-content">
            <Switch>
              <Route exact path={["/dashboard", "/dashboard/saving"]}>
                <h1>page par defaut</h1>
              </Route>
              <Route exact path={"/dashboard/transactions"}>
                <h1>historique</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Dashboard;
