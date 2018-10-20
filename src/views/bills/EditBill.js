import React from "react";
import { withApollo, Query } from "react-apollo";
import { getBill } from "../../graphql/queries";
import { deleteBill } from "../../graphql/mutations";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import moment from "moment";

import EditBillEntries from "./EditBillEntries";

const Bill = props => {
  const { classes } = props;

  const removeEntryFromBill = async _id => {
    const result = await props.client.mutate({
      mutation: deleteBill,
      variables: { _id }
    });

    props.history.push('/bills/')
    props.refetch()
  };


  return (
    <Query query={getBill} variables={{ billId: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (error) {
          return "Erro  r";
        }

        return (
          <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
              {loading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                <div>
                  <Typography variant="h4" gutterBottom>
                    {data.bill.customer.name} -{" "}
                    {moment(data.bill.billDate).format("DD.MM.YYYY")}
                  </Typography>
                  <EditBillEntries entries={data.bill.entries} />
                </div>
              )}
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonGroup}
                onClick={() => removeEntryFromBill(data.bill._id)}
              >
                Delete bill
              </Button>
            </Paper>
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
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  buttonGroup: {
    margin: theme.spacing.unit,
    marginLeft: "0px"
  }
}))(withApollo(Bill));
