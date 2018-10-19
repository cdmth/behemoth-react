import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { countHours } from '../../helpers/Timehelper'
import 'typeface-roboto';

class DashboardList extends React.Component {
  render() {
    const { entries } = this.props
    return (
      <List>
        {entries.map((entry) => (
        <ListItem key={entry._id}>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${countHours(entry.start, entry.end)}  ${entry.project.name}`}
            secondary={`${moment(entry.start).format("DD.MM HH:mm")} - ${moment(entry.end).format("HH:mm")}`}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <OfflineBoltIcon />
              <p>{entry.price}</p>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
    </List>
    );
  }
}

export default withStyles((theme) => ({
  root: {
    paddingTop: "20px"
  }
}))(DashboardList)