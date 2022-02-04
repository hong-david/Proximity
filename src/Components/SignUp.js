import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Services/firebase";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountCircle, LockRounded } from "@mui/icons-material";

export default function SignUp() {
  //creates regex for valid emails
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    const loginEmail = email;
    const loginPassword = password;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      return true
    } catch (error) {
      return false
    }
  };
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!regex.test(email)) {
      window.alert('Email is not valid')
    } else if (password.length < 6) {
      window.alert('Password should contain at least 6 characters')
    } else if (!(await createAccount())) {
      window.alert('Email is already in use')
    } else {
      navigate('/UserProfile')
    }
  }

  return (
    <Grid
      container
      style={{ minHeight: "100vh", backgroundColor: "WhiteSmoke" }}
    >
      <Grid item xs={12} sm={6}>
        <img
          src="socialGathering.jpeg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="title"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        style={{ padding: 10 }}
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            minWidth: "300px",
          }}
        >
          <Grid container justify="center">
            <img src="Proximity.png" width={300} alt="logo" />
          </Grid>
          <TextField
            required
            id="signup-basic"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            style={{ marginBottom: "20px" }}
            id="signup-password-input"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{ padding: "8px" }}
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>
          <Typography marginTop={2}>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              Sign In
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
