import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 700,
    padding: theme.spacing(3, 0),
    backgroundColor: Palette.titleBackground,
    borderRadius: "0% 0% 5% 5%",
    boxShadow: `0px 5px 50px ${Palette.boxShadow}`,
    marginBottom: theme.spacing(5),
  },
}));

function Title(): JSX.Element {
  const classes = useStyles();
  return <div className={classes.root}>Caddy UI</div>;
}

export default Title;
