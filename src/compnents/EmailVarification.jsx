import React from "react";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const EmailVarification = () => {
  const history = useHistory();
  var user = auth.currentUser;
  const handleVarification = () => {
    user
      .sendEmailVerification()
      .then(res => {
        alert("Varified Sent");
        history.push("/");
      })
      .catch(err => alert(err.message));
  };
  return (
    <div className="m-5 email__varification">
      {user ? (
        user.emailVerified ? (
          <h1 className="m-5">Your Account Already Varified</h1>
        ) : (
          <Button
            variant="contained"
            className="m-5"
            color="primary"
            onClick={handleVarification}
          >
            Email Varification
          </Button>
        )
      ) : (
        <h1>You Need to login</h1>
      )}
    </div>
  );
};

export default EmailVarification;
