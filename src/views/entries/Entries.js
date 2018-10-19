import React from "react";
import { Query } from "react-apollo";
import { queryAllCustomers } from "../../graphql/queries";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Grid from "@material-ui/core/Grid";
import SettingsIcon from "@material-ui/icons/Settings";
import WorkIcon from "@material-ui/icons/Work";

import CreateEntry from "./CreateEntry";
// import EditCustomer from "./EditCustomer";
// import Customer from "./Customer";

class Entries extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={queryAllCustomers}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return "Loading";
          }
          if (error) {
            return `Error! ${error.message}`;
          }

          return (
            <div className={classes.root}>
              <Grid container={true} spacing={8} justify="space-between">
                <Grid item={true} md={4}>
                  <CreateEntry />
                </Grid>
                <Grid item={true} md={6}>
                  {/* <Route
                    exact={true}
                    path="/customers/create"
                    render={props => (
                      <CreateCustomer refetch={() => refetch()} {...props} />
                    )}
                  />
                  <Route path="/customers/show/:id" component={Customer} />
                  <Route
                    exact={true}
                    path="/customers/settings/:id"
                    render={props => (
                      <EditCustomer refetch={() => refetch()} {...props} />
                    )}
                  /> */}
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))(Entries);
