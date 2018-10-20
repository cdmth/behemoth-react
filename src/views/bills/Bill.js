import React from "react";
import { Query } from "react-apollo";
import { getBill } from "../../graphql/queries";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import moment from 'moment'

import BillEntries from './BillEntries'

const Bill = props => {
  const { classes } = props;

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
                    {data.bill.customer.name} - {moment(data.bill.billDate).format('DD.MM.YYYY')}
                  </Typography>

                  <BillEntries entries={data.bill.entries} />
                </div>
              )}
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
  }
}))(Bill);
