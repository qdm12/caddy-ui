import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Palette from "constants/palette";
import { Collapse } from "@material-ui/core";
import jsYaml, { YAMLException } from "js-yaml";

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
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
  syntaxChoices: {
    display: "flex",
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  syntaxButton: {
    fontSize: 11,
    padding: theme.spacing(1),
    border: "2px solid",
    color: Palette.font,
    background: "none",
    boxShadow: `5px 3px 5px ${Palette.boxShadow}`,
    transition: "all 0.5s ease",
    borderColor: Palette.actionBorder,
    "&:hover": {
      borderColor: Palette.actionBorderHover,
    },
    "&:focus": {
      borderColor: Palette.actionBorderFocus,
      outline: 0,
    },
  },
  syntaxButtonSelected: {
    backgroundColor: Palette.selected,
  },
}));

interface Props {
  config: Record<string, unknown>;
  onChange: (newConfig: Record<string, unknown>) => void;
}

function Editor(props: Props): JSX.Element {
  const classes = useStyles();
  const [syntax, setSyntax] = useState("json");
  const [text, setText] = useState("{}");
  const [syntaxError, setSyntaxError] = useState("");
  const syntaxIsJSON = syntax === "json";

  try {
    const editorConfig = syntaxIsJSON ? JSON.parse(text) : jsYaml.safeLoad(text);
    if (JSON.stringify(editorConfig) !== JSON.stringify(props.config)) {
      const newText = syntaxIsJSON ? JSON.stringify(props.config, null, 2) : jsYaml.safeDump(props.config);
      setText(newText);
    }
  } catch (e) {} // fix syntax first

  const changeSyntax = (newSyntax: string) => (): void => {
    if (newSyntax === syntax) {
      return;
    }
    const newSyntaxIsJSON = newSyntax === "json";
    try {
      const editorConfig = newSyntaxIsJSON ? jsYaml.safeLoad(text) : JSON.parse(text);
      const newText = newSyntaxIsJSON ? JSON.stringify(editorConfig, null, 2) : jsYaml.safeDump(editorConfig);
      setText(newText);
      setSyntax(newSyntax);
    } catch (e) {} // fix syntax first
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const s = event.target.value;
    setText(s);
    try {
      const newConfig = syntaxIsJSON ? JSON.parse(s) : jsYaml.safeLoad(s);
      setSyntaxError("");
      props.onChange(newConfig);
    } catch (e) {
      if ((e instanceof SyntaxError || e instanceof YAMLException) && e.message !== syntaxError) {
        setSyntaxError(e.message);
      }
    }
  };

  const classNameJsonButton = clsx(classes.syntaxButton, syntaxIsJSON && classes.syntaxButtonSelected);
  const classNameYmlButton = clsx(classes.syntaxButton, !syntaxIsJSON && classes.syntaxButtonSelected);

  return (
    <div className={classes.root}>
      <div className={classes.title}>Caddy configuration</div>
      <div className={classes.syntaxChoices}>
        <button className={classNameJsonButton} onClick={changeSyntax("json")}>
          JSON
        </button>
        <button className={classNameYmlButton} onClick={changeSyntax("yml")}>
          YML
        </button>
      </div>
      <Collapse in={syntaxError !== ""}>
        <div className={classes.errorLine}>{syntaxError}</div>
      </Collapse>
      <textarea className={classes.textfield} value={text} onChange={handleChange} spellCheck="false" />
    </div>
  );
}

export default Editor;
