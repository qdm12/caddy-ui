import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "components/Title";
import Actions from "components/Actions";
import Caddyfile from "components/Caddyfile";
import Address from "components/Address";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: Palette.background,
    color: Palette.font,
  },
  background: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: Palette.background,
    zIndex: -1,
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
  const handleAddressChange = (address: string): void => {
    console.log(address);
  };
  return (
    <div className={classes.root}>
      <div className={classes.background} />
      <Title />
      <Address onChange={handleAddressChange} />
      <div className={classes.rowContainer}>
        <Actions />
        <Caddyfile />
      </div>
    </div>
  );
}

export default App;
