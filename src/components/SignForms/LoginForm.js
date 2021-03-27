import React from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

import monkeyImage from "../../assets/app-icon.png";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./styles";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";

const initialFormValues = {
  email: "",
  password: "",
};

export default function SignForm() {
  const classes = useStyles();
  const [checking, setChecking] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialFormValues);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const validation = () => {
    let temp = {};
    temp.email =
      values.email.length > 0 ? "" : "Email is not allowed to be empty";
    temp.password =
      values.password.length > 0 ? "" : "Password is not allowed to be empty";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handelLogin = (e) => {
    e.preventDefault();
    validation();
    if (validation()) {
      setChecking(true);
      dispatch(login({ values, setChecking, setAlertMessage, history }));
    } else {
      console.log("error valid");
    }
  };

  return (
    <Container maxWidth="xs" align="center" className={classes.root}>
      <img className={classes.logo} src={monkeyImage} alt="icon" />
      <Typography variant="h2" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handelLogin}>
        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
        <TextField
          error={errors.email !== undefined && errors.email !== ""}
          helperText={errors.email}
          className={classes.input}
          required
          id="email"
          name="email"
          label="Email"
          fullWidth
          autoComplete="given-name"
          value={values.email}
          onChange={handelInputChange}
        />
        <TextField
          error={errors.password !== undefined && errors.password !== ""}
          helperText={errors.password}
          className={classes.input}
          required
          id="password"
          name="password"
          label="Password"
          fullWidth
          autoComplete="given-name"
          type="password"
          onChange={handelInputChange}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          {checking ? <CircularProgress /> : "login"}
        </Button>
      </form>
      <small>
        Don't have an account ? sign up{" "}
        <Link className={classes.link} to="/signup">
          here
        </Link>
      </small>
    </Container>
  );
}
