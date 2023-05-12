// src/App.js

import React, { useEffect } from 'react';
import useStore from './store';
import "./styles/reset.css";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Posts/Home";
import Single from "./pages/Posts/Single";
import Write from "./pages/Posts/Write";
import Information from "./pages/Information";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { fetchUserData } from './services/api';

const App = () => {
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserData();
        if (response.user && response.user.name) {
          setUser({ name: response.user.name });
        } else {
          // ユーザー情報の取得に失敗した場合はnavigateを使わずに、ログインページにリダイレクト
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // エラーが発生した場合もログインページにリダイレクト
        // window.location.href = '/login';
      }
    };

    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/information" element={<Information />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<Single />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
