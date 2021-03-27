import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    width: "100%",
  },
  profilePic: {
    position: "relative",
  },
  avatar: {
    width: "200px",
    height: "200px",
    maxWidth: "100%",
    objectFit: "fill",
    borderRadius: "50%",
  },
  editIcon: {
    position: "absolute",
    top: "80%",
    right: "3%",
  },
  userLink: {
    marginBottom: "20px",
  },
  dateJoind: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "15px auto 5px auto",
  },
  profileControl: {
    display: "flex",
    justifyContent: "space-between",
  },
  location: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px auto 0",
  },
}));

export default useStyles;
