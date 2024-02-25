import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Layout } from "./layout/Layout";
import { FormDetail } from "./pages/FormDetail";
import { CreateForm } from "./pages/CreateForm";

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
        path: "/:slug",
        element: <FormDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
