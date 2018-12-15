import React from 'react'
import { Link } from "react-router-dom"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const mainListItems = (props) => (
  <List>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/customers" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
    </Link>
    <Link to="/projects" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
    </Link>
    <Link to="/entries" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Entries" />
      </ListItem>
    </Link>
    <Link to="/workers" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Workers" />
      </ListItem>
    </Link>
    <Link to="/bills" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Bills" />
      </ListItem>
    </Link>
  </List>
);

export default mainListItems