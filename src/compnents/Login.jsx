import React, { useState } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data.user.email);
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="user__login">
      <div className="login__container">
        <h2>Login</h2>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Link to="/signup">Create Account ?</Link>
      </div>
    </div>
  );
};

export default Login;
