import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Dashboard from "./app/dashboard/main/main";
import GeneralAuthComponent from "./app/auth/general-auth-box/general-auth-box";
import RegisterComponent from "./app/auth/register/register-component";
import LoginComponent from "./app/auth/login/login-component";
import { Saving } from "./app/dashboard/pages/saving/saving";
import { History } from "./app/dashboard/pages/history/history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <GeneralAuthComponent
            title="Page D'acceuil"
            authBoxElevation={0}
            childComponent={
              <>
                <h3>Page d'acceuil à Faire</h3>
                <hr></hr>
                <Link to={"login"}>Page de connection</Link>
              </>
            }
          />
        ),
      },
      {
        path: "login",
        element: (
          <GeneralAuthComponent
            title="Connexion"
            childComponent={<LoginComponent />}
          />
        ),
      },
      {
        path: "sign-up",
        element: (
          <GeneralAuthComponent
            title="Inscription"
            childComponent={<RegisterComponent title="Page d'inscription" />}
          />
        ),
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
        children: [
          {
            path: "",
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
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
