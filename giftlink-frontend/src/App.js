import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import Navbar from './components/Navbar/Navbar';

// Task 6: Import Profile component
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/product/:id" element={<DetailsPage />} />
        <Route path="/app/search" element={<SearchPage />} />

        {/* Task 6: Add Profile Route */}
        <Route path="/app/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;