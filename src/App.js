import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'

import './App.css'

import Header from './partials/Header'
import LeftBar from './partials/LeftBar'
import Dashboard from './views/dashboard/Dashboard'
import Customers from './views/customers/Customers'
import Projects from './views/projects/Projects'
import Entries from './views/entries/Entries'
import Workers from './views/workers/Workers'
import Bills from './views/bills/Bills'
import SignInScreen from './views/signin/SignInScreen'

const drawerWidth = 240;

class App extends React.Component  {

  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
        this.setState({redirect: !localStorage.getItem('firebase-token') ? true : false})
        window.addEventListener('storage', this.localStorageUpdated)
    }
  }
  componentWillUnmount(){
      if (typeof window !== 'undefined') {
          window.removeEventListener('storage', this.localStorageUpdated)
      }
  }

  localStorageUpdated() {
    console.log('vaihtuuko')
    if (!localStorage.getItem('firebase-token')) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    console.log('****************')
    console.log(this.state.redirect)

    const { classes } = this.props

    return (
      <Router>
        <div className={classes.root}>
          {this.state.redirect && <Redirect to='/signin'/>}
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
            <Route path="/workers" component={Workers} />
            <Route path="/bills" component={Bills} />
            <Route path="/signin" component={SignInScreen} />
          </main>
        </div>
      </Router>
    )
  }
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