import "./App.css";
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import JouneyPage from "./pages/JouneyPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
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

  return (
    <>
      <h1> CycleGo </h1>
    </>
  );
}

export default App;
