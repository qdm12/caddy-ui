import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "components/Title";
import Actions from "components/Actions";
import Caddyfile from "components/Caddyfile";
import Palette from "constants/palette";
import { getCaddyfile as apiGetCaddyfile, setCaddyfile as apiSetCaddyfile } from "api/caddyfile";

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
  const apiEndpoint = `${window.location.href}/api`; // Caddy UI API
  const classes = useStyles();
  const [caddyfileContent, setCaddyfileContent] = React.useState("");
  const getCaddyfile = async (): Promise<void> => {
    setCaddyfileContent(await apiGetCaddyfile(apiEndpoint));
  };
  const refresh = (): void => {
    getCaddyfile();
  };
  const upload = (): void => {
    apiSetCaddyfile(apiEndpoint, caddyfileContent);
  };
  React.useEffect(refresh);
  return (
    <div className={classes.root}>
      <div className={classes.background} />
      <Title />
      <div className={classes.rowContainer}>
        <Actions handleRefresh={refresh} handleUpload={upload} />
        <Caddyfile content={caddyfileContent} onChange={(content: string): void => setCaddyfileContent(content)} />
      </div>
    </div>
  );
}

export default App;
