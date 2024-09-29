// src/routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Repository from './pages/Repository';

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username/repository/:repoName" element={<Repository />} />
      </Routes>
  );
};

export default AppRoutes;
