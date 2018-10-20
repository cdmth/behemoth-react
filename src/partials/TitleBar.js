import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';

const TitleBar = props => (
  <AppBar className={props.classes.appbar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Close"
        onClick={() => props.history.push(props.push)}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={props.classes.flex}>
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(theme => ({
  root: {
    paddingTop: "20px"
  },
  appbar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
}))(withRouter(TitleBar));
