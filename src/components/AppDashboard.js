import React, { useState, useEffect } from "react";

import classes from "./TenantDashboard.module.css";

export default function AppDashboard(props) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(
      "http://apps.chrims.com:8180/vdi/platform/tenant/user/apps?userName=datatech",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblRlbmFudENvZGUiOiJjaHJpbXMiLCJsb2dpblRlbmFudEV4dHJhSW5mbyI6eyJsb2dvIjoidGVuYW50cy9jaHJpbXMvaW1hZ2VzL2xvZ28uanBnIiwidGVuYW50Q29kZSI6ImNocmltcyIsInRpdGxlIjoiQ0hSSU1TLVBHU0kifSwidXNlcl9uYW1lIjoiZGF0YXRlY2giLCJ0ZW5hbnRDb2RlIjoiY2hyaW1zIiwidXNlck5hbWUiOiJkYXRhdGVjaCIsImF1dGhvcml0aWVzIjpbIlBMQVRGT1JNX1VTRVIiXSwiY2xpZW50X2lkIjoidmVuaGFuLXRydXN0ZWQtY2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiLCJvcGVuaWQiXSwidGVuYW50SWQiOjAsIm9wZXJhdGlvblR5cGUiOm51bGwsImV4cCI6MTU4NDY1NzkzNywianRpIjoiNzBiN2ZlYTgtZjM5Mi00NTEyLWE3ZmEtZjhjODMxYTg5ZmMwIiwibG9naW5UZW5hbnRJZCI6MH0.DkyXxQXxPX4q28t06dKy8JrRb7AMfD9F3cOg3lPgxgI",
          "Content-Type": "application/json",
          "X-LoginTenantCode": "chrims",
          "X-TenantCode": "chrims",
          "X-TenantId": 0
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let dataset = data.dataset;
        let filteredApps = dataset.filter(
          data => data.tenantId === parseInt(props.match.params.tenantId)
        );
        setApps([...new Set(filteredApps.map(app => app.appKey))]);
      });
  }, []);

  const appClickedHandler = appCode => {
    console.log(props);
  };

  return (
    <div>
      {apps.map(app => (
        <div
          key={app}
          className={(classes.mainDashboard, "col-md-3")}
          onClick={() => appClickedHandler(app)}
        >
          <span>{app}</span>
        </div>
      ))}
    </div>
  );
}
