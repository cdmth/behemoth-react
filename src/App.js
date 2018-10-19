import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'

import './App.css'

import Header from './partials/Header'
import LeftBar from './partials/LeftBar'
import Dashboard from './views/dashboard/Dashboard'
import Customers from './views/customers/Customers'
import Projects from './views/projects/Projects'
import Entries from './views/entries/Entries'

const drawerWidth = 240;

const App = (props) => {
  const { classes } = props
  
  return (
    <Router>
      <div className={classes.root}>
        <Header />
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
          <div className={classes.toolbar} />
          <LeftBar />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact={true} path="/" component={Dashboard} />
          <Route path="/customers" component={Customers} />
          <Route path="/projects" component={Projects} />
          <Route path="/entries" component={Entries} />
          <Route path="/workers" component={Dashboard} />
          <Route path="/bills" component={Dashboard} />
          <Route path="/login" component={Dashboard} />
        </main>
      </div>
    </Router>
  );
}

export default withStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    height: '100%',
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
}))(App)