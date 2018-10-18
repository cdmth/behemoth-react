import React from 'react'
import { Query } from 'react-apollo'
import { queryCustomer } from '../../graphql/queries'
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const Customer = (props) => {
  const { classes } = props 

  return (
    <Query query={queryCustomer} variables={{_id: props.match.params.id}}>
      {({loading, error, data}) => {
        if(error) { return "Error"}
        
        return (
          <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
              <h2>{loading ? 
                <CircularProgress 
                  size={24} 
                  className={classes.buttonProgress} 
                /> : data.customer.name}
              </h2>
            </Paper>
          </Slide>  
        )
      }}
    </Query>
  )
}

export default withStyles((theme) => ({
  root: {
    paddingTop: "20px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  }
}))(Customer)