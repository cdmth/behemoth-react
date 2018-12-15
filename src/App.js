import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import "./App.css";

import Header from "./partials/Header";
import LeftBar from "./partials/LeftBar";
import Dashboard from "./views/dashboard/Dashboard";
import Customers from "./views/customers/Customers";
import Projects from "./views/projects/Projects";
import Entries from "./views/entries/Entries";
import Workers from "./views/workers/Workers";
import Bills from "./views/bills/Bills";
import SignInScreen from "./views/signin/SignInScreen";
import { auth } from "./helpers/firebase.js";

const drawerWidth = 240;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      user: null,
      loading: true
    };
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  }

  componentDidMount() {
    this.authListener();
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user, loading: false });
        auth.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            // Send token to your backend via HTTPS
            localStorage.setItem("firebase-token", idToken);
          })
          .catch(function(error) {
            // Handle error
          });
      } else {
        localStorage.setItem("firebase-token", null);
        this.setState({ user: null });
      }
    });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state);
    return this.state.user && !this.state.loading ? (
      <Router>
        <div className={classes.root}>
          <Header user={this.state.user} logout={() => this.logout()}/>
          <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
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
          </main>
        </div>
      </Router>
    ) : (
      <SignInScreen user={this.state.user} />
    );
  }
}

export default withStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    height: "100%",
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
}))(App);
