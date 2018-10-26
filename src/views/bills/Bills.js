import React from "react";
import { Query } from "react-apollo";
import { getBills } from "../../graphql/queries";
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

import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import SettingsIcon from "@material-ui/icons/Settings";
import WorkIcon from "@material-ui/icons/Work";

import CreateBill from "./CreateBill";
import EditBill from "./EditBill";
import Bill from "./Bill";
import Unbilled from "./Unbillled";

class Bills extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={getBills}>
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
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    component={Link}
                    to={`/bills/create`}
                  >
                    <AddIcon />
                  </Button>
                  <Grow in={!loading}>
                    <List>
                      {data.bills.map(bill => (
                        <ListItem
                          key={bill._id}
                          component={Link}
                          to={`/bills/show/${bill._id}`}
                          button
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <WorkIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${bill.customer.name} - ${moment(
                              bill.billDate
                            ).format("DD.MM.YYYY")}`}
                            secondary={`${bill.project.name}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="Settings"
                              component={Link}
                              to={`/bills/settings/${bill._id}`}
                            >
                              <SettingsIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Grow>
                </Grid>
                <Grid item={true} md={6}>
                  <Route
                    exact={true}
                    path="/bills/"
                    render={props => (
                      <Unbilled refetch={() => refetch()} {...props} />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/bills/create"
                    render={props => (
                      <CreateBill refetch={() => refetch()} {...props} />
                    )}
                  />
                  <Route path="/bills/show/:id" component={Bill} />
                  <Route
                    exact={true}
                    path="/bills/settings/:id"
                    render={props => (
                      <EditBill refetch={() => refetch()} {...props} />
                    )} />
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
}))(Bills);
