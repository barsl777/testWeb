import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import About from "./About.js";
import Sliders from "./Slider.js";
import { Users } from "./Users.js";
import PageNotFound from "./PageNotFound.js";
import { Context } from "./Users.js";

export default function App(props) {
  const { access } = useContext(Context);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={access ? <About /> : <Login />} />
        <Route path="/slider" element={access ? <Sliders /> : <Login />} />
        <Route path="/users" element={access ? <Users /> : <Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
