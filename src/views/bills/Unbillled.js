import React from "react";
import { Query } from "react-apollo";
import { unbilledEntriesInProjects } from "../../graphql/queries";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import moment from "moment";

import BillEntries from "./BillEntries";

const UnBilled = props => {
  const { classes } = props;

  return (
    <Query query={unbilledEntriesInProjects}>
      {({ loading, error, data }) => {
        if (error) {
          return "Error";
        }

        return loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : (
          data.unbilledEntriesInProjects.map(unbilledProject => (
            <Paper className={classes.paper} key={`${unbilledProject.project._id}-key`}>
              <div>
                <Typography variant="h5" gutterBottom>
                  {unbilledProject.project.name}
                </Typography>

                <BillEntries entries={unbilledProject.entries} />
              </div>
            </Paper>
          ))
        );
      }}
    </Query>
  );
};

export default withStyles(theme => ({
  root: {
    paddingTop: "20px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(UnBilled);
