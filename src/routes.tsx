import React from 'react';
import { useRoutes } from 'react-router-dom';
import ErrorPage from './error-page';
import { getStore } from './lib/store';
import Favorites from './routes/favorites';
import Folder from './routes/folder';
import Index from './routes/index';
import Onboarding from './routes/onboarding';
import Root from './routes/root';
import Settings from './routes/settings';
import Trash from './routes/trash';
import Unorganized from './routes/unorganized';

const Routes = () => {
  const [libraryLocation, setLibraryLocation] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const fetchLibraryLocation = async () => {
      const location = await getStore('libraryLocation');
      setLibraryLocation(location);
    };

    fetchLibraryLocation();
  }, []);

  const routing = useRoutes([
    {
      path: '/',
      element: libraryLocation ? <Root /> : <Onboarding />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />
        },
        {
          path: 'unorganized',
          element: <Unorganized />
        },
        {
          path: 'favorites',
          element: <Favorites />
        },
        {
          path: 'trash',
          element: <Trash />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'folder/:folderName',
          element: <Folder />
        }
      ]
    },
    {
      path: '/onboarding',
      element: <Onboarding />
    }
  ]);

  return routing;
};

export default Routes;
