import React from "react";

import Header from "./components/Header/Header";
import Toolbar from "./components/Toolbar/Toolbar";
import Info from "./pages/Info/Info";
import Home from "./pages/Home/Home.jsx";
import Users from "./pages/Users/Users.jsx";
import Register from "./pages/Register/Register.jsx";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cadastro" element={<Register />} />
        <Route path="usuarios" element={<Users />} />
        <Route path="informacoes/:groupId/:itemId" element={<Info />} />
      </Routes>
      <Toolbar />
    </BrowserRouter>
  );
};

export default App;
