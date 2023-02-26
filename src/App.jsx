//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import './App.css'
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Productos from "./pages/Productos";
import Add from "./pages/products/add";
import Update from "./pages/products/update";
import View from "./pages/products/view";
import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

function App() {

  return (
    <div className="bg-slate-100 min-h-screen">      
        <Routes>
          <Route element={<AuthLayout />}>
           <Route path="/" element={<Home />} />
           <Route path="/productos" element={<Productos />} />
           <Route path="/productos/add" element={<Add />} />
           <Route path='/productos/update/:id' element={<Update/>} />
          </Route>
            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items" element={<View />} />
            </Route> 
        </Routes>
    </div>
  );
}

export default App
