/**
 * Created by NB on 4/16/2017.
 */

import React from "react";
import {Route, Switch} from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./components/NotFound";

import KanbanBoard from "./containers/KanbanBoard";

export default ({childProps}) => (
  <Switch>
    {/* <AppliedRoute path="/" exact component={Home} props={childProps}/> */}
    <AppliedRoute path="/kanban" exact component={KanbanBoard} props={childProps}/>

    { /* Safety route to handle 404 */ }
    <Route component={NotFound}/>
  </Switch>
);