import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";

export default function Signup() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  if (access) navigate("/login");

  const CreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreate) => {
        const user = userCreate.user;
        set(ref(database, "users/" + text), {
          email: email,
          password: password,
          text: text
        });
        setAccess(!!user);
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="signup">
      <h1>Sing Up</h1>
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
        <Button onClick={CreateAccount}>Sing Up</Button>
      </div>
    </div>
  );
}
