import React from 'react'
import { Query } from 'react-apollo'
import { queryAllProjects } from '../../graphql/queries'
import { withStyles } from '@material-ui/core/styles';
import { Route, Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import WorkIcon from '@material-ui/icons/Work';

import CreateProject from './CreateProject'
// import EditCustomer from './EditCustomer'
// import Customer from './Customer'


class Customers extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Query query={queryAllProjects}>
        {({ loading, error, data, refetch }) => {
          if (loading) { return "Loading" }
          if (error) { return `Error! ${error.message}` }

          return (
            <div className={classes.root}>
              <Grid container={true} spacing={8} justify="space-between">
                <Grid item={true} md={4}>
                  <Button 
                    variant="fab" 
                    color="primary" 
                    aria-label="Add" 
                    className={classes.button}
                    component={Link} 
                    to={`/projects/create`}
                    >
                    <AddIcon />
                  </Button>
                  <List subheader={<li />}>
                    {data.customers.map(customer => (
                      <li key={`section-${customer._id}`}>
                        <ul>
                          <ListSubheader>{customer.name}</ListSubheader>
                          {customer.projects.map(project => (
                            <ListItem 
                              key={project._id} 
                              component={Link} 
                              to={`/customers/${project._id}`} 
                              button
                              >
                              <ListItemAvatar>
                                <Avatar>
                                  <WorkIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${project.name}`}
                                secondary={`${customer.name}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton 
                                  aria-label="Settings"
                                  component={Link}
                                  to={`/projects/settings/${project._id}`} 
                                  >
                                  <SettingsIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </List>
                </Grid>
                <Grid item={true} md={6}>
                <Route
                    exact={true}
                    path="/projects/create"
                    render={props => (
                      <CreateProject refetch={() => refetch()} {...props} />
                    )}
                  />
                {/* <Route path="/customers/:id" component={Customer} />
                <Route path="/customers/settings/:id" component={EditCustomer} /> */}
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
}))(Customers)