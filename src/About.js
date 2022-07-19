import React, { useState, useEffect, useContext } from "react";
import { Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.js";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Context } from "./Users.js";

export default function About() {
  const [data, setData] = useState(null);
  const { setAccess } = useContext(Context);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setAccess(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/10")
      .then((res) => res.json())
      .then((res) => setData(Object.values(res.company)));
  });

  return (
    <div className="about">
      <h1>About</h1>
      <nav>
        <ul>
          <li>
            <Link onClick={() => navigate("/users")}>Users</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/slider")}>Slider</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/about")}>Login</Link>
          </li>
          <li>
            <Button onClick={Logout}>Logout</Button>
          </li>
        </ul>
      </nav>
      <table>{data && data.map((item) => <td>{item}</td>)}</table>
    </div>
  );
}
