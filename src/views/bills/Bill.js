import React from "react";
import { Query } from "react-apollo";
import { getBill } from "../../graphql/queries";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import moment from "moment";

import BillEntries from "./BillEntries";
import TitleBar from "../../partials/TitleBar";
import BillHeader from "../../images/bill_header.svg";

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
                  <Grid container justify="space-between">
                    <Grid
                      item={true}
                      md={12}
                      className={classes.billImageContainer}
                    >
                      <img src={BillHeader} className={classes.billImage} />
                    </Grid>
                    <Grid item={true} md={6}>
                      <Typography style={{ display: "table" }} variant="title">
                        {data.bill.customer.name}
                      </Typography>
                      <Typography style={{ display: "table" }}>
                        {data.bill.customer.address}
                      </Typography>
                      <Typography style={{ display: "table" }}>
                        {data.bill.customer.postalCode}{" "}
                        {data.bill.customer.city}
                      </Typography>
                      <Typography style={{ display: "table" }}>
                        {data.bill.customer.country}
                      </Typography>
                    </Grid>
                    <Grid item={true} md={6}>
                      <div className={classes.contactContainer}>
                        <Typography
                          style={{ display: "table" }}
                          variant="title"
                        >
                          {data.bill.customer.name}
                        </Typography>
                        <Typography style={{ display: "table" }}>
                          {data.bill.customer.address}
                        </Typography>
                        <Typography style={{ display: "table" }}>
                          {data.bill.customer.postalCode}{" "}
                          {data.bill.customer.city}
                        </Typography>
                        <Typography style={{ display: "table" }}>
                          {data.bill.customer.country}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
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
  billImage: {
    width: "100%"
  },
  billImageContainer: {
    overflow: "hidden",
    height: "140px",
    marginBottom: "20px"
  },
  contactContainer: {
    display: "table",
    float: "right"
  },
  billInfoContainer: {
    display: "table"
  },
  paper: {
    marginTop: "20px",
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(Bill);
