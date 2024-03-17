import React, { useState } from "react";
import "../css/login.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    passward: "",
  });
  const [isSignUp, setIsSignup] = useState(false);
  const handelChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        passward: inputs.passward,
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px 20px #eee"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h5" padding={3} textAlign="center">
            {isSignUp ? "SignUp" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField
              name="name"
              value={inputs.name}
              onChange={handelChange}
              placeholder="Name"
              margin="normal"
              required
            />
          )}
          <TextField
            name="email"
            value={inputs.email}
            onChange={handelChange}
            type="email"
            placeholder="email"
            margin="normal"
            required
          />
          <TextField
            name="passward"
            value={inputs.passward}
            onChange={handelChange}
            type="passward"
            placeholder="Passward"
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              borderRadius: 30,
              marginTop: 3,
            }}
          >
            Submit
          </Button>
          <Button
            sx={{
              borderRadius: 30,
              marginTop: 2,
            }}
            onClick={() => setIsSignup(!isSignUp)}
          >
            Change To {isSignUp ? "login" : "signup"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Auth;
