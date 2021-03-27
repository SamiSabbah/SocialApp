import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    margin: "80px auto 0",
    maxWidth: "1200px",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  profile: {
    padding: "20px",
    width: "90%",
  },
  profile__buttons: {
    textAlign: "center",
  },
}));

export default useStyles;
