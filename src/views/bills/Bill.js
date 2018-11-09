import React from "react";
import { Query } from "react-apollo";
import { getBill } from "../../graphql/queries";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import moment from "moment";

import BillEntries from "./BillEntries";
import TitleBar from "../../partials/TitleBar";

const Bill = props => {
  const { classes } = props;

  return (
    <Query query={getBill} variables={{ billId: props.match.params.id }}>
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
                <TitleBar
                  title={`${data.bill.customer.name} - ${moment(
                    data.bill.billDate
                  ).format("DD.MM.YYYY")}`}
                  push="/bills"
                />
                <Paper className={classes.paper}>
                  <p>{data.bill.customer.name}</p>
                  <p>{data.bill.customer.address}</p>
                  <p>{data.bill.customer.postalCode}</p>
                  <p>{data.bill.customer.city}</p>
                  <p>{data.bill.customer.country}</p>
                </Paper>

                <Paper className={classes.paper}>
                  <BillEntries entries={data.bill.entries} />
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
  root: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: "20px",
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(Bill);
