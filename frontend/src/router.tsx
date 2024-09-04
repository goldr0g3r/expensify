import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Header from "./container/header";
import Sidebar from "./container/sidebar";
import { useContext } from "react";

function ProtectedRoutes({ children }: { children: any }) {
  const location = useLocation();
  //const { isLoggedIn } = useContext(UserContext)

  // if (isLoggedIn) return children;

  return <Navigate to="/account/login" state={{ from: location.pathname }} />;
}

function Root() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Some Error Occured!</div>,
    children: [
      {
        path: "user",
        element: <div>user</div>,
      },
      {
        path: "account/login",
        element: <div>login</div>,
      },
      {
        path: "account",
        element: (
          <ProtectedRoutes>
            <div>account</div>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default function Router() {
  return (
    <HelmetProvider>
      <RouterProvider
        router={browserRouter}
        fallbackElement={<div>Loading...</div>}
      />
    </HelmetProvider>
  );
}
