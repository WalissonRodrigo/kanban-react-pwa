import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { ProtectedRoute } from './ProtectedRoute';
import { getPageHeight } from './utils';

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component, auth }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                auth ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
