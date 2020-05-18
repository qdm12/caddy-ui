import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 700,
    padding: "20px 0 20px 0",
    backgroundColor: "#457a8c",
    borderRadius: "0% 0% 5% 5%",
    boxShadow: "0px 5px 50px #505057",
    marginBottom: 30,
  },
});

function Title(): JSX.Element {
  const classes = useStyles();
  return <div className={classes.root}>Caddy UI</div>;
}

export default Title;
