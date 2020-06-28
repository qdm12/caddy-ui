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
    backgroundColor: Palette.background,
    color: Palette.font,
  },
});

const uiApiEndpoint = `${window.location.host}/api`; // "http://localhost:8000/api"

function App(): JSX.Element {
  const classes = useStyles();
  const [config, setConfig] = useState({});
  const [forcedEditorConfig, setForcedEditorConfig] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorRef = useRef(null);

  const clearError = (): void => {
    setShowError(false);
    setTimeout((): void => {
      errorRef.current = null;
    }, 100);
  };

  const downloadConfig = async (): Promise<void> => {
    try {
      const newConfig = await APIGetConfig(uiApiEndpoint);
      if (!showSuccess) {
        setShowSuccess(true);
      }
      setConfig(newConfig);
      setForcedEditorConfig(newConfig);
    } catch (e) {
      const s = e.toString();
      if (s !== errorRef.current) {
        errorRef.current = s;
        setShowError(true);
      }
    }
  };

  const uploadConfig = async (): Promise<void> => {
    try {
      const response = await APISetConfig(uiApiEndpoint, config);
      console.log(response); // TODO
      if (!showSuccess) {
        setShowSuccess(true);
      }
    } catch (e) {
      const s = e.toString();
      if (s !== errorRef.current) {
        errorRef.current = s;
        setShowError(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newConfig = await APIGetConfig(uiApiEndpoint);
        setConfig(newConfig);
      } catch (e) {
        errorRef.current = e.toString();
        setShowError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Title />
      <Actions handleDownload={downloadConfig} handleUpload={uploadConfig} />
      <Editor
        forcedConfig={forcedEditorConfig}
        config={config}
        onChange={(newConfig: Record<string, unknown>): void => {
          setConfig(newConfig);
        }}
      />
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={(): void => setShowSuccess(false)}>
        <Alert severity="success">Success</Alert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={2000} onClose={clearError}>
        <Alert severity="error">{errorRef.current}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
