import * as React from "react";
import { withApollo, Mutation } from "react-apollo";
import { createEntry, updateEntry, deleteEntry } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import { InlineDateTimePicker } from "material-ui-pickers/DateTimePicker";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const CreateEntry = ({
  classes,
  entry: {
    _id,
    start,
    end,
    description,
    projectId,
    workerId,
    edit,
    workers,
    projects
  },
  handleChange,
  refetch,
  selectProject,
  clear
}) => (
  <div className="">
    <Mutation
      mutation={edit ? updateEntry : createEntry}
      onCompleted={() => {
        handleChange("creating", false);
        handleChange("initTime", true);
        refetch();
        clear();
      }}
    >
      {(create, { loading }) => {
        const entry = () => {
          return { _id, start, end, description, projectId, workerId };
        };

        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleChange("creating", true);
              create({ variables: entry() });
            }}
            autoComplete="off"
          >
            <div className="add-bar">
              <div className={classes.root}>
                <FormControl fullWidth className={classes.textField}>
                  <InputLabel htmlFor="select-project">
                    Select project
                  </InputLabel>
                  <Select
                    disabled={loading}
                    value={projectId}
                    onChange={event => selectProject(event.target.value)}
                    inputProps={{
                      name: "Project",
                      id: "select-project"
                    }}
                  >
                    {projects.map(project => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.root}>
                <FormControl fullWidth className={classes.textField}>
                  <InputLabel htmlFor="select-worker">Select worker</InputLabel>
                  <Select
                    disabled={projectId === "" || loading}
                    value={workerId}
                    onChange={e => handleChange("workerId", e.target.value)}
                    inputProps={{
                      name: "Project",
                      id: "select-project"
                    }}
                  >
                    {workers.map(worker => (
                      <MenuItem key={worker._id} value={worker._id}>
                        {worker.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.root}>
                <TextField
                  disabled={loading}
                  id="standard-multiline-flexible"
                  className={classes.textField}
                  label="Description"
                  multiline={true}
                  rowsMax="6"
                  value={description}
                  onChange={event =>
                    handleChange("description", event.target.value)
                  }
                  margin="normal"
                  fullWidth={true}
                />
              </div>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.root}>
                  <InlineDateTimePicker
                    disabled={loading}
                    className={classes.inputField}
                    label="Start time"
                    value={start.toDate()}
                    onChange={start => handleChange("start", start)}
                    ampm={false}
                    maxDate={end.toDate()}
                    format="DD.MM HH:mm"
                  />

                  <InlineDateTimePicker
                    disabled={loading}
                    className={classes.inputField}
                    label="End time"
                    value={end.toDate()}
                    onChange={end => handleChange("end", end)}
                    ampm={false}
                    minDate={start.toDate()}
                    format="DD.MM HH:mm"
                  />
                </div>
              </MuiPickersUtilsProvider>

              <div className={classes.root}>
                <Button
                  disabled={loading}
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      className={classes.loadingClass}
                    />
                  ) : (
                    ""
                  )}
                  {edit ? "Update entry" : "Create entry"}
                </Button>
              </div>
            </div>
            {edit ? (
              <Mutation mutation={deleteEntry} onCompleted={() => refetch()}>
                {(deleteC, { loading }) => (
                  <Button
                    disabled={loading}
                    variant="contained"
                    className={classes.button}
                    color="default"
                    onClick={e => {
                      e.preventDefault();
                      deleteC({
                        variables: { _id }
                      });
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        className={classes.loadingClass}
                      />
                    ) : (
                      ""
                    )}
                    Delete
                  </Button>
                )}
              </Mutation>
            ) : (
              ""
            )}
          </form>
        );
      }}
    </Mutation>
  </div>
);

export default withStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    width: "150px",
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  loadingClass: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))(withApollo(CreateEntry));
