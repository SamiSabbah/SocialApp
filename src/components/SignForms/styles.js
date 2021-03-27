import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "80px auto 0",
  },
  logo: {
    margin: "30px 0",
  },
  input: {
    marginBottom: "20px",
  },
  button: {
    "&:hover": {
      background: "#008394",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

export default useStyles;
