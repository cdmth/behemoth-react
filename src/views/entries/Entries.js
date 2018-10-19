import React from "react";
import { withApollo, compose, graphql } from "react-apollo";
import { getEntries, getProjectWorkers, getProjects } from "../../graphql/queries";
import { withStyles } from "@material-ui/core/styles";
// import { Route, Link } from "react-router-dom";

// import IconButton from "@material-ui/core/IconButton";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
// import SettingsIcon from "@material-ui/icons/Settings";
// import WorkIcon from "@material-ui/icons/Work";

import CreateEntry from "./CreateEntry";
import CalendarEntry from "./CalendarEntry";
import ListEntries from '../dashboard/DashboardList'
// import EditCustomer from "./EditCustomer";
// import Customer from "./Customer";

class Entries extends React.Component {
  constructor(props) {
    super();
    this.state = {
      _id: "",
      projectId: "",
      workerId: "",
      name: "",
      start: moment(),
      end: moment(),
      description: "",
      edit: false,
      initTime: true,
      creating: false,
      workers: [],
      projects: []
    };

    this.fetchProjects(props); 
  }

  onSelectSlot(selected) {
    this.setState({
      start: moment(selected.start),
      end: moment(selected.end),
      edit: false,
      initTime: false,
      _id: ""
    });
  }

  async handleEntryClick(entry) {
    entry.start = moment(entry.start);
    entry.end = moment(entry.end);

    this.fetchProjectWorkers(entry.projectId)

    this.setState({
      ...entry,
      edit: entry._id !== "" ? true : false,
      initTime: false
    });
  }

  async fetchProjectWorkers(projectId) {
    const result = await this.props.client.query({
      query: getProjectWorkers, variables: { _id: projectId }
    });

    this.setState({
      workers: result.data.project.workers
    });
  }

  async selectProject(projectId) {
    await this.fetchProjectWorkers(projectId)
    this.handleChange('projectId', projectId)
  }

  async fetchProjects(props) {
    const { client } = props;
    const result = await client.query({
      query: getProjects
    });

    this.setState({
      projects: result.data.projects,
      loading: false,
    });
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const {
      classes,
      data: { entries, loading, refetch },
    } = this.props;

    const {
      workerId,
      name,
      start,
      end,
      projectId,
      _id,
      description,
      edit,
      initTime,
      creating
    } = this.state;

    let events;

    loading
      ? (events = [])
      : (events = entries.map(entry => {
          return {
            workerId: entry.workerId,
            title: entry.name,
            start: moment(entry.start).toDate(),
            end: moment(entry.end).toDate(),
            name: entry.worker.name,
            projectId: entry.projectId,
            _id: entry._id,
            description: entry.description
          };
        }));

    console.log(this.state);
    const addDraft = () => {
      events.push({
        workerId: workerId,
        title: name,
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        worker: {
          name
        },
        projectId: projectId,
        _id: _id,
        description: description
      });
    };

    if (!edit && !initTime && !creating) {
      addDraft();
    }

    return (
      <div className={classes.root}>
        <Grid container={true} spacing={8} justify="space-between">
          <Grid item={true} md={4}>
            <CreateEntry
              handleChange={(name, value) => this.handleChange(name, value)}
              entry={this.state}
              refetch={() => refetch()}
              selectProject={projectId => this.selectProject(projectId)}
            />
            <ListEntries entries={loading ? [] : entries} />
          </Grid>
          <Grid item={true} md={8}>
            <CalendarEntry
              onSelectSlot={selected => this.onSelectSlot(selected)}
              handleEntryClick={entry => this.handleEntryClick(entry)}
              entries={events}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))(compose(withApollo, graphql(getEntries))(Entries));
