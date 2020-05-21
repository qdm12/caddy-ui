import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "components/Title";
import Actions from "components/Actions";
import Caddyfile from "components/Caddyfile";
import Palette from "constants/palette";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  const clearError = (): void => {
    setError(null);
  };
  const getCaddyfile = async (): Promise<void> => {
    try {
      const content = await apiGetCaddyfile(apiEndpoint);
      setCaddyfileContent(content);
    } catch (e) {
      const s = e.toString();
      if (s !== error) {
        setError(s);
      }
      throw e;
    }
  };
  const setCaddyfile = async (): Promise<void> => {
    try {
      await apiSetCaddyfile(apiEndpoint, caddyfileContent);
      if (!showSuccess) {
        setShowSuccess(true);
      }
    } catch (e) {
      const s = e.toString();
      if (s !== error) {
        setError(s);
      }
    }
  };
  const hydrate = (): void => {
    try {
      getCaddyfile();
    } catch (e) {}
  };
  const refresh = (): void => {
    try {
      getCaddyfile();
      if (!showSuccess) {
        setShowSuccess(true);
      }
    } catch (e) {}
  };
  const upload = (): void => {
    setCaddyfile();
  };
  React.useEffect(hydrate);
  return (
    <div className={classes.root}>
      <div className={classes.background} />
      <Title />
      <div className={classes.rowContainer}>
        <Actions handleRefresh={refresh} handleUpload={upload} />
        <Caddyfile content={caddyfileContent} onChange={(content: string): void => setCaddyfileContent(content)} />
      </div>
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={(): void => setShowSuccess(false)}>
        <Alert severity="success">Success</Alert>
      </Snackbar>
      <Snackbar open={error !== null} autoHideDuration={2000} onClose={clearError}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
