import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function Root() {
  return (
    <div>
      root router
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
