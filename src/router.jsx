import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Layout } from "./layout/Layout";
import { FormDetail } from "./pages/FormDetail";
import { CreateForm } from "./pages/CreateForm";
import { PageNotFound } from "./pages/PageNotFound";
import { SubmitForm } from "./pages/SubmitForm";
import { Forbidden } from "./pages/Forbidden";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateForm />,
      },
      {
        path: "/:slug/detail",
        element: <FormDetail />,
      },
      {
        path: "/:slug/submit",
        element: <SubmitForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
