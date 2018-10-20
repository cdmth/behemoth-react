import React from "react";
import { withApollo, compose, graphql } from "react-apollo";
import {
  getEntries,
  getProjectWorkers,
  getProjects
} from "../../graphql/queries";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import CreateEntry from "./CreateEntry";
import CalendarEntry from "./CalendarEntry";
import ListEntries from "../dashboard/DashboardList";

const initState = {
  _id: "",
  projectId: "",
  workerId: "",
  name: "",
  start: moment(),
  end: moment(),
  description: "",
  edit: false,
  initTime: true,
  creating: false
};

class Entries extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...initState,
      workers: [],
      projects: []
    };

    this.fetchProjects(props);
  }

  onSelectSlot = selected =>
    this.setState({
      start: moment(selected.start),
      end: moment(selected.end),
      edit: false,
      initTime: false,
      _id: ""
    });

  async handleEntryClick(entry) {
    entry.start = moment(entry.start);
    entry.end = moment(entry.end);

    this.fetchProjectWorkers(entry.projectId);

    this.setState({
      ...entry,
      edit: entry._id !== "" ? true : false,
      initTime: false
    });
  }

  async fetchProjectWorkers(projectId) {
    const result = await this.props.client.query({
      query: getProjectWorkers,
      variables: { _id: projectId }
    });

    this.setState({
      workers: result.data.project.workers
    });
  }

  async selectProject(projectId) {
    await this.fetchProjectWorkers(projectId);
    this.handleChange("projectId", projectId);
  }

  async fetchProjects(props) {
    const { client } = props;
    const result = await client.query({
      query: getProjects
    });

    this.setState({
      projects: result.data.projects,
      loading: false
    });
  }

  handleChange = (name, value) => this.setState({ [name]: value });

  clear = () => this.setState(initState);

  render() {
    const {
      classes,
      data: { entries, loading, refetch }
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
              clear={() => this.clear()}
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
}))(
  compose(
    withApollo,
    graphql(getEntries)
  )(Entries)
);
