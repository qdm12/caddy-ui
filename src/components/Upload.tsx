import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    border: "2px solid",
    color: Palette.font,
    background: "none",
    boxShadow: `5px 3px 5px ${Palette.boxShadow}`,
    marginBottom: 10,
    transition: "all 0.5s ease",
    borderColor: Palette.actionBorder,
    "&:hover": {
      borderColor: Palette.actionBorderHover,
    },
    "&:focus": {
      borderColor: Palette.actionBorderFocus,
    },
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  handleClick: () => void;
}

function Upload(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <button className={classes.root} onClick={props.handleClick}>
      <PublishIcon className={classes.icon} />
      <span>Upload</span>
    </button>
  );
}

export default Upload;