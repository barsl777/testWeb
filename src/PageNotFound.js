import React, { useContext } from "react";
import { Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.js";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Context } from "./Users.js";

export default function PageNotFound() {
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

  return (
    <div className="pageNotFound">
      <h1>Page Not Found</h1>
      <nav>
        <ul>
          <li>
            <Link onClick={() => navigate("/signup")}>SignUp</Link>
          </li>
          <li>
            <Button onClick={Logout}>Logout</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
