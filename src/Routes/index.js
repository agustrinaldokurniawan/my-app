import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {paths} from '../Menu';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {paths.map((item, key) => (
          <Route
            key={key}
            path={item.path}
            element={React.createElement(item.element)}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
