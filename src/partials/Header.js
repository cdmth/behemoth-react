import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Behemoth
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))(Header);