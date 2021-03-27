import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { signup } from "../../features/auth/authSlice";

import monkeyImage from "../../assets/app-icon.png";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const initialFormValues = {
  email: "",
  password: "",
  confirm: "",
  handel: "",
};

export default function SignForm() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checking, setChecking] = useState(false);
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();

  // checking form validation
  const validation = () => {
    let temp = {};
    temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Invalid Email!";
    temp.password =
      values.password.length > 6 ? "" : "Password should be more than 6";
    temp.confirm =
      values.confirm === values.password ? "" : "Should match password";
    temp.handel = values.handel ? "" : "ThisField is required";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  // form submit handler
  const handelSignin = (e) => {
    e.preventDefault();
    validation();
    if (validation()) {
      setChecking(true);
      dispatch(signup({ values, setChecking, setAlertMessage, history }));
    } else {
      console.log("error valid");
    }
  };

  // form input change
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="xs" align="center" className={classes.root}>
      <img className={classes.logo} src={monkeyImage} alt="icon" />
      <Typography variant="h2" gutterBottom>
        SignUp
      </Typography>
      <form onSubmit={handelSignin}>
        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
        <TextField
          error={errors.email !== undefined && errors.email !== ""}
          helperText={errors.email}
          className={classes.input}
          name="email"
          label="Email"
          fullWidth
          value={values.email}
          onChange={handelInputChange}
        />
        <TextField
          error={errors.password !== undefined && errors.password !== ""}
          helperText={errors.password}
          className={classes.input}
          name="password"
          label="Password"
          fullWidth
          type="password"
          value={values.password}
          onChange={handelInputChange}
        />
        <TextField
          error={errors.confirm !== undefined && errors.confirm !== ""}
          helperText={errors.confirm}
          className={classes.input}
          id="confirm"
          name="confirm"
          label="Confirm Password"
          fullWidth
          type="password"
          value={values.confirm}
          onChange={handelInputChange}
        />
        <TextField
          error={errors.handel !== undefined && errors.handel !== ""}
          helperText={errors.handel}
          className={classes.input}
          id="handel"
          name="handel"
          label="Handel"
          fullWidth
          value={values.handel}
          onChange={handelInputChange}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          {checking ? <CircularProgress /> : "Signup"}
        </Button>
      </form>
      <small>
        Have an account ? Login{" "}
        <Link className={classes.link} to="/login">
          here
        </Link>
      </small>
    </Container>
  );
}
