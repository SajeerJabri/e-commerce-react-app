import React, { useState } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import firebase from "firebase";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");

  // add user sign up data in firebase firestore database
  const addUser = event => {
    db.collection("user").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
      email: email,
      password: password,
      address: address,
      phone: phone,
    });
  };

  const handldeSignUp = event => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    console.log(address);
    console.log(phone);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        addUser();
        // console.log(data.user.email);
        history.push("/email-varification");
        return data.user.updateProfile({
          phoneNumber: phone,
          pa: address,
          displayName: name,
        });
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="user__login">
      <div className="login__container">
        <h2>Sign Up</h2>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          required
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          type="number"
          variant="outlined"
          required
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          required
          onChange={e => setAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handldeSignUp}>
          Sign Up
        </Button>
        <Link to="/login">Already hava an Account ?</Link>
      </div>
    </div>
  );
};

export default SignUp;
