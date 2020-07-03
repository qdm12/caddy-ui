import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "components/Title";
import Actions from "components/Actions";
import Editor from "components/Editor";
import Palette from "constants/palette";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { getConfig as APIGetConfig, setConfig as APISetConfig } from "services/caddy";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: Palette.background,
    color: Palette.font,
  },
});

const development = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const uiApiEndpoint = development ? "http://localhost:8000/api" : `${window.location.href}api`;

function App(): JSX.Element {
  const classes = useStyles();
  const [config, setConfig] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorRef = useRef("");

  const setError = (s: string): void => {
    if (s !== errorRef.current) {
      errorRef.current = s;
      setShowError(true);
    }
  };
  const clearError = (): void => {
    setShowError(false);
    setTimeout((): void => {
      errorRef.current = "";
    }, 100);
  };

  const downloadConfig = async (): Promise<void> => {
    try {
      const newConfig = await APIGetConfig(uiApiEndpoint);
      if (!showSuccess) {
        setShowSuccess(true);
      }
      setConfig(newConfig);
    } catch (e) {
      setError(e.toString());
    }
  };

  const uploadConfig = async (): Promise<void> => {
    try {
      await APISetConfig(uiApiEndpoint, config);
      if (!showSuccess) {
        setShowSuccess(true);
      }
    } catch (e) {
      setError(e.toString());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newConfig = await APIGetConfig(uiApiEndpoint);
        setConfig(newConfig);
      } catch (e) {
        setError(e.toString());
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Title />
      <Actions handleDownload={downloadConfig} handleUpload={uploadConfig} />
      <Editor
        config={config}
        onChange={(newConfig: Record<string, unknown>): void => {
          setConfig(newConfig);
        }}
      />
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={(): void => setShowSuccess(false)}>
        <Alert severity="success">Success</Alert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={2000 * (1 + errorRef.current.length / 100)} onClose={clearError}>
        <Alert severity="error">{errorRef.current}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
