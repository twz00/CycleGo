import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import JouneyPage from "./src/pages/JouneyPage";
import LandingPage from "./src/pages/LandingPage";
import LoginPage from "./src/pages/LoginPage";
import MainPage from "./src/pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/MainPage",
    element: <MainPage />,
  },
  {
    path: "/JourneyPage",
    element: <JouneyPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);