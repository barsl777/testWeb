import React, { useContext } from "react";
import Slider from "react-slick";
import { Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.js";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Context } from "./Users.js";

export default function Sliders() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
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
    <div className="sliders">
      <h1>Slider</h1>
      <nav>
        <ul>
          <li>
            <Link onClick={() => navigate("/signup")}>SignUp</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/users")}>Users</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/about")}>About</Link>
          </li>
          <li>
            <Button onClick={Logout}>Logout</Button>
          </li>
        </ul>
      </nav>
      <Slider {...settings}>
        <div>
          <img src={require("./img.jpg")} width="500" height="500" alt="" />
        </div>
        <div>
          <img src={require("./img.jpg")} width="500" height="500" alt="" />
        </div>
        <div>
          <img src={require("./img.jpg")} width="500" height="500" alt="" />
        </div>
      </Slider>
    </div>
  );
}
