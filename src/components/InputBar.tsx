import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontStyle: "italic",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  input: {
    maxWidth: 250,
    padding: theme.spacing(1),
    border: "2px solid",
    borderRadius: 5,
    borderColor: Palette.inputBorder,
    color: Palette.inputFont,
    background: Palette.inputBackground,
    fontWeight: "bold",
    transition: "all 0.5s ease",
    "&:hover": {
      borderColor: Palette.inputBorderHover,
    },
    "&:focus": {
      borderColor: Palette.inputBorderFocus,
      backgroundColor: Palette.inputBackgroundFocus,
    },
  },
}));

interface Props {
  label?: string;
  defaultValue?: string;
  onChange: (s: string) => void;
}

function InputBar(props: Props): JSX.Element {
  const classes = useStyles();
  const defaultValue = props.defaultValue ? props.defaultValue : "";
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <div className={classes.root}>
      {props.label && <div className={classes.label}>{props.label}</div>}
      <input className={classes.input} value={value} onChange={handleChange} spellCheck="false"></input>
    </div>
  );
}

export default InputBar;
