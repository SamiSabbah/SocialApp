import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    marginBottom: "20px",
    width: "100%",
  },
  media: {
    minHeight: "173px",
    minWidth: "160px",
  },
  content: {
    padding: "25px",
    objectFit: "cover",
  },
  expandIcon: {
    position: "absolute",
    left: "90%",
    transform: "rotate(90deg)",
  },
  deleteIcon: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
}));

export default useStyles;
