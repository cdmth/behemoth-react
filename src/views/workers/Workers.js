import React from "react";
import { Query } from "react-apollo";
import { queryAllWorkers } from "../../graphql/queries";
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

import CreateWorker from "./CreateWorker";
import EditWorker from "./EditWorker";
import Worker from "./Worker";

class Workers extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={queryAllWorkers}>
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
                    to={`/workers/create`}
                  >
                    <AddIcon />
                  </Button>
                  <List>
                    {data.workers.map(worker => (
                      <ListItem
                        key={worker._id}
                        component={Link}
                        to={`/workers/show/${worker._id}`}
                        button
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${worker.name}`}
                          secondary={`${worker.name}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Settings"
                            component={Link}
                            to={`/workers/settings/${worker._id}`}
                          >
                            <SettingsIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item={true} md={6}>
                  <Route
                    exact={true}
                    path="/workers/create"
                    render={props => (
                      <CreateWorker refetch={() => refetch()} {...props} />
                    )}
                  />
                  <Route path="/workers/show/:id" component={Worker} />
                  <Route
                    exact={true}
                    path="/workers/settings/:id"
                    render={props => (
                      <EditWorker refetch={() => refetch()} {...props} />
                    )}
                  />
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
}))(Workers);
