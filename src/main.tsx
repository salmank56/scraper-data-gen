import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Error } from "./pages/Error.tsx";
import EditPrompt from "./pages/EditPrompts.tsx";
import EditTaxonomy from "./pages/EditTaxonomy.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" Component={App}>
      <Route index path="/" Component={Home} />
      <Route index path="/edit-taxonomy" Component={EditTaxonomy} />
      <Route index path="/edit-prompt" Component={EditPrompt} />
    </Route>
      <Route path="/error" element={<Error/>}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
