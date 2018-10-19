import React from "react";
import { withApollo, compose, graphql, Mutation } from "react-apollo";
import { getProjectWorkers, queryAllWorkers } from "../../graphql/queries";
import {
  updateProject,
  deleteProject,
  addProjectWorker,
  deleteProjectWorker
} from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

class EditProject extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      _id: "",
      rate: "",
      loading: true,
      workerId: "",
      workers: [],
      projectWorkers: []
    };

    this.fetchData(props);
  }

  componentWillReceiveProps(next) {
    this.fetchData(next);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async fetchData(props) {
    const { client } = props;
    const resultWorkers = await client.query({
      query: queryAllWorkers
    });

    if (!this.props.data.loading) {
      this.setState({
        name: this.props.data.project.name,
        _id: this.props.data.project._id,
        projectWorkers: this.props.data.project.workers,
        workers: resultWorkers.data.workers,
        loading: false
      });
    }
  }

  render() {
    const { classes, refetch, data, history } = this.props;
    const { _id, workerId, workers, projectWorkers, rate } = this.state;

    return (
      <Mutation
        mutation={updateProject}
        onCompleted={() => {
          refetch();
          this.setState({ name: "", _id: "" });
        }}
      >
        {(edit, { loading, error }) => {
          if (error) {
            return "Error!";
          }

          return (
            <Slide
              direction="left"
              in={!this.state.loading}
              mountOnEnter
              unmountOnExit
            >
              <Paper className={classes.paper}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    edit({ variables: { _id, name: this.state.name } });
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl required fullWidth>
                    <TextField
                      required
                      disabled={loading}
                      id="standard-name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      margin="normal"
                    />
                  </FormControl>

                  <div className={classes.workerArea}>
                    <div>
                      <InputLabel htmlFor="workerArea">
                        Project workers
                      </InputLabel>
                    </div>
                    <Mutation
                      mutation={deleteProjectWorker}
                      onCompleted={() => {
                        data.refetch();
                      }}
                    >
                      {(remove, { loading, error }) => {
                        return this.state.loading
                          ? ""
                          : projectWorkers.map(w => (
                              <div key={w._id} id="workerArea">
                                <Chip
                                  icon={<FaceIcon />}
                                  label={w.name}
                                  onClick={() =>
                                    history.push(`/workers/show/${w._id}`)
                                  }
                                  onDelete={() =>
                                    remove({
                                      variables: {
                                        workerId: w._id,
                                        projectId: _id
                                      }
                                    })
                                  }
                                  className={classes.chip}
                                  variant="outlined"
                                />
                              </div>
                            ));
                      }}
                    </Mutation>

                    <Mutation
                      mutation={addProjectWorker}
                      onCompleted={() => {
                        this.setState({ workerId: "", rate: "" });
                        data.refetch();
                      }}
                    >
                      {(add, { loading, error }) => {
                        return (
                          <div className="add-project-worker">
                            <FormControl className={classes.field}>
                              <InputLabel htmlFor="select-worker">
                                Add worker
                              </InputLabel>
                              <Select
                                value={workerId}
                                onChange={event =>
                                  this.setState({
                                    workerId: event.target.value
                                  })
                                }
                                inputProps={{
                                  name: "Worker",
                                  id: "select-worker"
                                }}
                              >
                                {workers.map(worker => (
                                  <MenuItem key={worker._id} value={worker._id}>
                                    {worker.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            {workerId !== "" ? (
                              <Grow in={workerId !== ""}>
                                <div className="add-worker-wrapper">
                                  <FormControl required fullWidth>
                                    <TextField
                                      required
                                      disabled={loading}
                                      id="standard-name"
                                      label="Rate"
                                      type="number"
                                      className={classes.field}
                                      value={rate}
                                      onChange={this.handleChange("rate")}
                                      margin="normal"
                                    />
                                  </FormControl>
                                  <Button
                                    className={classes.buttonGroup}
                                    size="small"
                                    variant="extendedFab"
                                    color="primary"
                                    aria-label="Add"
                                    onClick={e =>
                                      add({
                                        variables: {
                                          projectId: _id,
                                          workerId,
                                          rate: parseFloat(rate)
                                        }
                                      })
                                    }
                                  >
                                    <AddIcon />
                                    Add worker
                                  </Button>
                                  <Button
                                    className={classes.buttonGroup}
                                    disabled={loading}
                                    variant="contained"
                                    color="default"
                                    onClick={() =>
                                      this.setState({ rate: "", workerId: "" })
                                    }
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </Grow>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      }}
                    </Mutation>
                  </div>

                  <Button
                    className={classes.buttonGroup}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Mutation
                    mutation={deleteProject}
                    onCompleted={() => {
                      refetch();
                      this.setState({ name: "", _id: "" });
                    }}
                  >
                    {(deleteC, { loading }) => (
                      <Button
                        className={classes.buttonGroup}
                        disabled={loading}
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteC({ variables: { _id } })}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    )}
                  </Mutation>
                </form>
              </Paper>
            </Slide>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(theme => ({
  root: {
    paddingTop: "20px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  buttonGroup: {
    margin: theme.spacing.unit,
    marginLeft: "0px"
  },
  field: {
    width: "200px;"
  },
  workerArea: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  chip: {
    marginTop: "10px"
  }
}))(
  compose(
    withApollo,
    graphql(getProjectWorkers, {
      options: props => ({
        variables: {
          _id: props.match.params.id
        }
      })
    })
  )(EditProject)
);
