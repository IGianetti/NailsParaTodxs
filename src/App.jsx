import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Inicio from "./pages/inicio/Inicio";
import Servicios from "./pages/servicios/Servicios";
import Turnos from "./pages/turnos/Turnos";

import NavBar from "./components/navbar/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/turnos" element={<Turnos />} />
      </Routes>
    </Router>
  );
};

export default App;
