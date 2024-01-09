import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Settings from "./routes/settings";
import Index from "./routes/index";
import Unorganized from "./routes/unorganized";
import Favorites from "./routes/favorites";
import Trash from "./routes/trash";
import Folder from "./routes/folder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "unorganized",
        element: <Unorganized />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "folder/:folderName",
        element: <Folder />,
      },
    ],
  },
]);
