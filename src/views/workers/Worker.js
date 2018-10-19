import React from 'react'
import { Query } from 'react-apollo'
import { queryWorker } from '../../graphql/queries'
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const Worker = (props) => {
  const { classes } = props 

  return (
    <Query query={queryWorker} variables={{_id: props.match.params.id}}>
      {({loading, error, data}) => {
        if(error) { return "Error"}
        
        return (
          <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
            {loading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                <Typography variant="h3">
                  <Avatar
                    alt={data.worker.name}
                    src="https://via.placeholder.com/80x80"
                    className={classes.avatar}
                  />
                  {data.worker.name}
                </Typography>
              )}
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
  },
  avatar: {
    width: "60px",
    height: "60px",
    display: "inline-block",
    margin: "0px 10px -10px 0"
  }
}))(Worker)