import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import LoginPage from "./pages/loginpage/LoginPage";
import Profile from "./components/profile/Profile";
import CreatePost from "./components/createpost/CreatePost";
import Layout from "./Layout";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
    </Routes>
  );
};

export default App;
