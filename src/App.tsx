import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "components/Title";
import Actions from "components/Actions";
import Caddyfile from "components/Caddyfile";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#5c92a4",
    color: "#fff",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "start",
    },
  },
}));

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title />
      <div className={classes.rowContainer}>
        <Actions />
        <Caddyfile />
      </div>
    </div>
  );
}

export default App;
