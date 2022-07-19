import { Button, Input, TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { accessUsers } from "./Users";
import firebaseConfig from "./firebaseConfig.js";
import { Context } from "./Users.js";

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access, setAccess } = useContext(Context);

  useEffect(() => {
    if (access) navigate("/users");
    const users = ref(database, "users");
    onValue(users, (snapshot) => {
      const dataUsers = snapshot.val();
      setData(Object.values(dataUsers).map((item) => Object.values(item)));
    });
  });

  const GoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        dispatch(accessUsers(data));
        setAccess(!!result.user);
      })
      .catch((error) => console.log(error.message));
  };

  const LoginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userLogin) => {
        dispatch(accessUsers(data));
        setAccess(!!userLogin.user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="login">
      <h1>Sing In</h1>
      <div className="blockForm">
        <div className="item">
          <label>
            Email:
            <Input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="item">
          <label>
            Password:
            <Input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div className="text">
          <label>
            Text:
            <TextField
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="btn">
        <Button onClick={LoginUser}>Sing In</Button>
      </div>
      <Button onClick={GoogleAuth}>Sing In With Google</Button>
    </div>
  );
}
