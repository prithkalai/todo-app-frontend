import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import PrivateRoutes from "./PrivateRoutes";
import SignupPage from "./SignupPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  { path: "/login", element: <Layout children={<LoginPage />} /> },
  { path: "/signup", element: <Layout children={<SignupPage />} /> },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <Layout children={<HomePage />} />,
      },
    ],
  },
]);

export default router;
