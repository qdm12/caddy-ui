import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "constants/palette";
// TODO import jsYaml from "js-yaml";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  textfield: {
    width: "100%",
    height: 600,
    boxSizing: "border-box",
    borderRadius: 6,
    backgroundColor: Palette.textAreaBackground,
    color: Palette.textAreaFont,
    padding: theme.spacing(1),
    fontWeight: "bold",
    border: "2px solid",
    borderColor: Palette.textAreaBorder,
    transition: "all 0.25s ease",
    "&:hover": {
      borderColor: Palette.textAreaBorderHover,
    },
  },
  [theme.breakpoints.down("sm")]: {
    height: 300,
  },
}));

interface Props {
  forcedConfig: Record<string, unknown>;
  config: Record<string, unknown>;
  onChange: (newConfig: Record<string, unknown>) => void;
}

function Editor(props: Props): JSX.Element {
  const classes = useStyles();
  const lastForcedConfigRef = useRef({});
  const lastValidConfigRef = useRef({});
  const [jsonString, setJsonString] = useState("{}");
  if (JSON.stringify(lastForcedConfigRef.current) !== JSON.stringify(props.forcedConfig)) {
    lastForcedConfigRef.current = props.forcedConfig;
    lastValidConfigRef.current = props.forcedConfig;
    setJsonString(JSON.stringify(props.forcedConfig, null, 2));
  }
  if (JSON.stringify(lastValidConfigRef.current) !== JSON.stringify(props.config)) {
    setJsonString(JSON.stringify(props.config, null, 2));
    lastValidConfigRef.current = props.config;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const s = event.target.value;
    setJsonString(s);
    try {
      const newConfig = JSON.parse(s);
      lastValidConfigRef.current = newConfig;
      props.onChange(newConfig);
    } catch (e) {}
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>Caddy configuration</div>
      <textarea className={classes.textfield} value={jsonString} onChange={handleChange} spellCheck="false" />
    </div>
  );
}

export default Editor;
