import React from 'react';
import {
  BrowserRouter, Navigate, NavLink, Outlet, Route, Routes
} from "react-router-dom";
import DemoCircle from './pages/DemoCircle.jsx';
import DemoMap4d from './pages/DemoMap4d.jsx';
import DemoMarker from './pages/DemoMarker.jsx';
import DemoPolygon from './pages/DemoPolygon.jsx';
import DemoPolyline from './pages/DemoPolyline.jsx';

const demoRouters = [
  {
    path: "/demo/map",
    name: "Demo Map4d",
    pathName: "/demo/map",
    element: <DemoMap4d />
  },
  {
    path: "/demo/marker",
    name: "Demo Marker",
    pathName: "/demo/marker",
    element: <DemoMarker />
  },
  {
    path: "/demo/circle",
    name: "Demo Circle",
    pathName: "/demo/circle",
    element: <DemoCircle />
  },
  {
    path: "/demo/polyline",
    name: "Demo Polyline",
    pathName: "/demo/polyline",
    element: <DemoPolyline />
  },
  {
    path: "/demo/polygon",
    name: "Demo Polygon",
    pathName: "/demo/polygon",
    element: <DemoPolygon />
  }
]

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/demo" />} />
        <Route
          path='/demo'
          element={
            <>
              <div style={{ display: "flex", gap:"10px" }}>
                {
                  demoRouters?.map(router => {
                    return (
                      <NavLink key={router.path} to={router.pathName}>{router.name}</NavLink>
                    )
                  })
                }
              </div>
              <hr />
              <Outlet />
            </>

          }
        >
          {
            demoRouters?.map(router => {
              return (
                <Route key={router.path} path={router.path} element={router.element} />
              )
            })
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
