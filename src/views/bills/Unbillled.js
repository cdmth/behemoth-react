import React from "react";
import { Query, Mutation } from "react-apollo";
import { unbilledEntriesInProjects } from "../../graphql/queries";
import { createBillFromUnbilled } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BillEntries from "./BillEntries";

const UnBilled = props => {
  const { classes } = props;

  return (
    <Query query={unbilledEntriesInProjects}>
      {({ loading, error, data, refetch }) => {
        if (error) {
          return "Error";
        }

        return loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : (
          <div>
            <Typography variant="h5" gutterBottom>
            {data.unbilledEntriesInProjects.length > 0 ? 'Unbilled entries by project' : ''}
            </Typography>

            {data.unbilledEntriesInProjects.map(unbilledProject => (
              <Paper
                className={classes.paper}
                key={`${unbilledProject.project._id}-key`}
              >
                <div>
                  <Typography variant="h6" gutterBottom>
                    {unbilledProject.project.name}
                  </Typography>

                  <BillEntries entries={unbilledProject.entries} />
                </div>
                <Mutation
                  mutation={createBillFromUnbilled}
                  onCompleted={() => {
                    refetch();
                    props.refetch();
                  }}
                >
                  {(create, { loading, error }) => {
                    if (error) {
                      return "Error!";
                    }
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          create({
                            variables: {
                              projectId: unbilledProject.project._id
                            }
                          })
                        }
                      >
                        Create bill
                      </Button>
                    );
                  }}
                </Mutation>
              </Paper>
            ))}
          </div>
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
