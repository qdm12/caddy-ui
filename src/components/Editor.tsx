import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "constants/palette";
import { Collapse } from "@material-ui/core";
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
    marginBottom: theme.spacing(1),
  },
  errorLine: {
    marginBottom: theme.spacing(1),
    color: "#fc2c03",
    fontWeight: "bold",
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
  config: Record<string, unknown>;
  onChange: (newConfig: Record<string, unknown>) => void;
}

function Editor(props: Props): JSX.Element {
  const classes = useStyles();
  const [jsonString, setJsonString] = useState("{}");
  const [syntaxError, setSyntaxError] = useState("");
  try {
    const editorConfig = JSON.parse(jsonString);
    if (JSON.stringify(editorConfig) !== JSON.stringify(props.config)) {
      setJsonString(JSON.stringify(props.config, null, 2));
    }
  } catch (e) {}
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const s = event.target.value;
    setJsonString(s);
    try {
      const newConfig = JSON.parse(s);
      props.onChange(newConfig);
      setSyntaxError("");
    } catch (e) {
      if (e instanceof SyntaxError && e.message !== syntaxError) {
        setSyntaxError(e.message);
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>Caddy configuration</div>
      <Collapse in={syntaxError !== ""}>
        <div className={classes.errorLine}>{syntaxError}</div>
      </Collapse>
      <textarea className={classes.textfield} value={jsonString} onChange={handleChange} spellCheck="false" />
    </div>
  );
}

export default Editor;
