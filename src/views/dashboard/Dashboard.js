import React from 'react'
import { Query } from 'react-apollo'
import { getEntries, entriesSubscription } from '../../graphql/queries'
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DashboardCreate from './DashboardCreate'
import DashboardList from './DashboardList'

class Dashboard extends React.Component {
  render() {
    let unsubscribe = null

    const { classes } = this.props

    return (
      <Query query={getEntries}>
        {({ loading, error, data, subscribeToMore, refetch}) => {
          if (loading) { return "Loading" }
          if (error) { return `Error! ${error.message}` }
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: entriesSubscription,
              updateQuery: () => { 
                refetch().then((data) => data) 
              }
            })
          }

          return (
            <div className={classes.root}>
              <Grid container={true} spacing={8}>
                <Grid item={true} xs={4}>
                  <Paper className={classes.paper}>
                    <DashboardCreate />
                    <DashboardList entries={data.entries}/>
                  </Paper>
                </Grid>
                <Grid item={true} xs={4}>
                  <Paper className={classes.paper}>
                    xs=4
                  </Paper>
                </Grid>
                <Grid item={true} xs={4}>
                  <Paper className={classes.paper}>xs=4</Paper>
                </Grid>
              </Grid>
            </div>
          )
        }}
      </Query>
    );
  }
}

export default withStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}))(Dashboard)