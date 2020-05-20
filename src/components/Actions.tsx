import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import RefreshIcon from "@material-ui/icons/Refresh";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    color: Palette.font,
  },
  action: {
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
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
}));

function Actions(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>Actions</div>
      <button className={classes.action}>
        <SaveAltIcon className={classes.actionIcon} />
        <span>Save</span>
      </button>
      <button className={classes.action}>
        <RefreshIcon className={classes.actionIcon} />
        <span>Refresh</span>
      </button>
    </div>
  );
}

export default Actions;
