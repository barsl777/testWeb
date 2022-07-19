import React, { useState, useContext } from "react";
import { Link, Button } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "./firebaseConfig.js";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const Context = React.createContext({
  access: false,
  setAccess: () => {}
});

export function ContextWrapper(props) {
  const [access, setAccess] = useState();
  return (
    <Context.Provider
      value={{
        access,
        setAccess
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

const initialState = { usersList: [["Data"]] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    accessUsers: (state, action) => {
      state.usersList = action.payload;
    }
  }
});

export function Users() {
  const { usersList } = useSelector((state) => state.users);
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
    <div className="users">
      <h1>Users</h1>
      <nav>
        <ul>
          <li>
            <Link onClick={() => navigate("/signup")}>SignUp</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/slider")}>Slider</Link>
          </li>
          <li>
            <Link onClick={() => navigate("/about")}>About</Link>
          </li>
          <li>
            <Button onClick={Logout}>Logout</Button>
          </li>
        </ul>
      </nav>
      <table>
        {usersList.map((item) => (
          <tr>
            {item.map((elm) => (
              <td>{elm}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export const { accessUsers } = usersSlice.actions;
export default usersSlice.reducer;
