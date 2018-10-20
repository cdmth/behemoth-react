import React from "react";
import { withApollo, Query } from "react-apollo";
import { getBill } from "../../graphql/queries";
import { deleteBill } from "../../graphql/mutations";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import moment from "moment";

import EditBillEntries from "./EditBillEntries";
import TitleBar from "../../partials/TitleBar";

const Bill = props => {
  const { classes } = props;

  const removeEntryFromBill = async _id => {
    await props.client.mutate({
      mutation: deleteBill,
      variables: { _id }
    });

    props.history.push("/bills/");
    props.refetch();
  };

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
                  title={`Edit bill ${data.bill.customer.name} - ${moment(
                    data.bill.billDate
                  ).format("DD.MM.YYYY")}`}
                  push="/bills"
                />
                <Paper className={classes.paper}>
                  <EditBillEntries entries={data.bill.entries} />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonGroup}
                    onClick={() => removeEntryFromBill(data.bill._id)}
                  >
                    Delete bill
                  </Button>
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
    padding: theme.spacing.unit * 2
  },
  buttonGroup: {
    margin: theme.spacing.unit,
    marginLeft: "0px"
  }
}))(withApollo(Bill));
