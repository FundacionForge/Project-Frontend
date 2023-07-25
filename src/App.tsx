import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import AuthGuard from "./guards/authGuard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import { store } from "./redux/store";
import { RoutesWithNotFound } from "./utils/routes-with-not-found";

const Login = React.lazy(() => import('./pages/Login/Login'));
const Private = React.lazy(() => import('./pages/Private/Private'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<>...Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </React.Suspense>
    </div>
  );
}

export default App;
