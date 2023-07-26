import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import AuthGuard from "./guards/authGuard";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import { LoadingPage } from "./pages/LoadingPage";
import { store } from "./redux/store";
import { RoutesWithNotFound } from "./utils/routes-with-not-found";
import { Flowbite } from "flowbite-react";

const Login = React.lazy(() => import('./pages/Login/Login'));
const Private = React.lazy(() => import('./pages/Private/Private'));

function App() {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Provider store={store}>
        <Flowbite>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Flowbite>
      </Provider>
    </React.Suspense>
  );
}

export default App;
