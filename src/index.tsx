import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./app/shared/utilities/apollo";
import { store } from "./app/store/store";
import App from "./App";
import "./index.css";

import LoadingIndicator from "./app/shared-components/loading-indicator";
const Dashboard = lazy(() => import("./app/dashboard/main/main"));
const GeneralAuthComponent = lazy(
  () => import("./app/auth/general-auth-box/general-auth-box")
);
const RegisterComponent = lazy(
  () => import("./app/auth/register/register-component")
);
const LoginComponent = lazy(() => import("./app/auth/login/login-component"));
const Saving = lazy(() => import("./app/dashboard/pages/saving/saving"));
const History = lazy(() => import("./app/dashboard/pages/history/history"));
const CollectiveProgress = lazy(
  () => import("./app/dashboard/pages/collective-progress/collective-progress")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginComponent />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "sign-up",
        element: <RegisterComponent title="Page d'inscription" />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Saving />,
          },
          {
            path: "saving",
            element: <Saving />,
          },
          {
            path: "transactions",
            element: <History />,
          },
          {
            path: "collective-progress",
            element: <CollectiveProgress />,
          },
          {
            path: "*",
            element: (
              <>
                <h5>Element inconnu</h5>
              </>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <GeneralAuthComponent
            title="Page not found"
            authBoxElevation={3}
            childComponent={
              <>
                <Link to={"/"} title="Page d'acceil">
                  Revenir à la page d'acceuil
                </Link>
              </>
            }
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Suspense fallback={<LoadingIndicator />}>
          <RouterProvider router={router} />
        </Suspense>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
