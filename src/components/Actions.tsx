import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "constants/palette";
import Upload from "components/Upload";
import Refresh from "components/Refresh";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 4),
  },
  title: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    color: Palette.font,
  },
}));

interface Props {
  handleUpload: () => void;
  handleRefresh: () => void;
}

function Actions(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>Actions</div>
      <Upload handleClick={props.handleUpload} />
      <Refresh handleClick={props.handleRefresh} />
    </div>
  );
}

export default Actions;
