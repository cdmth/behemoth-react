import React from "react";
import { Query } from "react-apollo";
import { queryCustomer } from "../../graphql/queries";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import TitleBar from "../../partials/TitleBar";

const Customer = props => {
  const { classes } = props;

  return (
    <Query query={queryCustomer} variables={{ _id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (error) {
          return "Error";
        }

        return (
          <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
            {loading ? (
              <CircularProgress size={24} className={classes.buttonProgress} />
            ) : (
              <div>
                <TitleBar title={data.customer.name} push="/customers" />
                <Paper className={classes.paper}>
                <p>{data.customer.name}</p>
                <p>{data.customer.businessId}</p>
                <p>{data.customer.address}</p>
                <p>{data.customer.postalCode}</p>
                <p>{data.customer.city}</p>
                <p>{data.customer.country}</p>
                </Paper>
              </div>
            )}
          </Slide>
        );
      }}
    </Query>
  );
};

export default withStyles(theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(Customer);
