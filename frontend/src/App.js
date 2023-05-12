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
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // 初回レンダリング時にlocalStorageからトークンを取得し、ログイン状態を復元
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // トークンが存在する場合、ログイン状態をセット
  //     setUser({ name: 'test' });
  //   }
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserData();
        if (response.user && response.user.name) {
          setUser({ name: response.user.name });
        } else {
          // ユーザー情報の取得に失敗した場合はログインページにリダイレクト
          // navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // エラーが発生した場合もログインページにリダイレクト
        // navigate('/login');
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
