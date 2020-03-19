import React from "react";
import TenantDashboard from "./components/TenantDashboard";
import { Route } from "react-router";
import AppDashboard from "./components/AppDashboard";

function App() {
  return (
    <>
      <Route path="/dashboard/:tenantId" component={AppDashboard} />
      <Route path="/" exact component={TenantDashboard} />
    </>
  );
}

export default App;
