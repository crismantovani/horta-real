import React, { useState } from 'react'
import { Outlet } from "react-router-dom";

import Header from './components/Header/Header';
import Toolbar from './components/Toolbar/Toolbar';

import './App.css'

function App () {
  const [titlePage, setTitlePage] = useState("Condominio Burgues");

  return (
    <>
      <div>
        <Header></Header>
        <div className='pageTitle'>{titlePage}</div>
      </div>
      <Outlet />
      <Toolbar></Toolbar>
    </>
  );
}

export default App;
