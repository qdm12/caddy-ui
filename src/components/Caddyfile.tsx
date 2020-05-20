import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    borderRadius: 10,
    backgroundColor: "#dcdcf5",
    color: "#151517",
    padding: theme.spacing(2),
  },
  innerInput: {
    padding: theme.spacing(2),
  },
}));

function Caddyfile(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const initialContent = `https://mydomain.com {
  proxy / host.docker.internal:8080
  proxy /myapp host.docker.internal:8081
  proxy /myotherapp host.docker.internal:8082 {
    without /myotherapp
  }
}`;
  const [content, setContent] = React.useState(initialContent);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(event.target.value);
  const rows = isMobile ? 25 : 60;
  const cols = isMobile ? 40 : 80;

  return (
    <div className={classes.root}>
      <div className={classes.title}>Caddyfile configuration</div>
      <textarea
        className={classes.textfield}
        autoFocus
        value={content}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        spellCheck="false"
      />
    </div>
  );
}

export default Caddyfile;
