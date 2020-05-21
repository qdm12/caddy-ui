import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Palette from "constants/palette";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 4,
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  textfield: {
    borderRadius: 6,
    backgroundColor: Palette.textAreaBackground,
    color: Palette.textAreaFont,
    padding: theme.spacing(2),
    fontWeight: "bold",
    border: "2px solid",
    borderColor: Palette.textAreaBorder,
    transition: "all 0.25s ease",
    "&:hover": {
      borderColor: Palette.textAreaBorderHover,
    },
  },
  innerInput: {
    padding: theme.spacing(2),
  },
}));

interface Props {
  content: string;
  onChange: (content: string) => void;
}

function Caddyfile(props: Props): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    props.onChange(event.target.value);
  };
  const rows = isMobile ? 25 : 60;
  const cols = isMobile ? 40 : 80;
  return (
    <div className={classes.root}>
      <div className={classes.title}>Caddyfile configuration</div>
      <textarea
        className={classes.textfield}
        autoFocus
        value={props.content}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        spellCheck="false"
      />
    </div>
  );
}

export default Caddyfile;
