import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./scraper/pages/Home.tsx";
import { Error } from "./scraper/pages/Error.tsx";
import EditPrompt from "./scraper/pages/EditPrompts.tsx";
import EditTaxonomy from "./scraper/pages/EditTaxonomy.tsx";
import DataGenHome from "./data-generation/pages/DataGenHome.tsx";
import NotFound from "./components/shared/NotFound.tsx";
import EditInputs from "./data-generation/pages/EditInputs.tsx";
import UserGuide from "./scraper/pages/UserGuide.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

const RedirectToScraper = () => {
  return <Navigate to="/scraper" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" Component={App}>
        <Route index element={<RedirectToScraper />} />
        <Route path="/scraper" Component={Home} />
        <Route path="/scraper/edit-taxonomy" Component={EditTaxonomy} />
        <Route path="/scraper/edit-prompt" Component={EditPrompt} />
        <Route path="/scraper/User-Guide" Component={UserGuide} />
      </Route>
      <Route path="" element={<App />}>
        <Route path="/data-gen" element={<DataGenHome />}></Route>
        <Route path="/data-gen/edit-inputs" element={<EditInputs />}></Route>
      </Route>
      <Route path="/error" element={<Error />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </>
  )
  // { basename: "/scraper" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
