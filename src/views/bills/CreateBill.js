import React from "react";
import { withApollo, Mutation } from "react-apollo";
import {
  queryAllCustomers,
  getProjectsAndEntries,
  entriesByProjectIdAndTimeRange
} from "../../graphql/queries";
import { createBill } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import moment from "moment";

import DashboardList from "../dashboard/DashboardList";

class CreateBill extends React.Component {
  constructor(props) {
    super();
    this.state = {
      start: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      end: moment().set({ hour: 23, minute: 59, second: 59, millisecond: 99 }),
      name: "",
      customerId: "",
      projectId: "",
      loading: true,
      projects: [],
      customers: [],
      entries: [],
      entriesLoading: false
    };

    this.fetchCustomers(props);
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value }, () => this.fetchEntries(this.props));
  };

  async fetchCustomers({ client }) {
    const customersFetch = await client.query({
      query: queryAllCustomers
    });

    this.setState({
      customers: customersFetch.data.customers,
      loading: false
    });
  }

  async fetchProjects({ client }) {
    const projectFetch = await client.query({
      query: getProjectsAndEntries
    });

    this.setState({
      projects: projectFetch.data.projects,
      loading: false
    });
  }

  async fetchEntries({ client }) {
    this.setState({ entriesLoading: true });
    const { projectId, start, end } = this.state;

    if (projectId !== "") {
      const entriesFetch = await client.query({
        query: entriesByProjectIdAndTimeRange,
        variables: { projectId, start, end }
      });

      this.setState({
        entries: entriesFetch.data.entriesByProjectIdAndTimeRange,
        entriesLoading: false
      });
    }
  }

  async selectCustomer(customerId) {
    await this.fetchProjects(this.props);
    this.setState({ projectId: "" });
    this.handleChange("customerId", customerId);
  }

  render() {
    const { classes, refetch } = this.props;
    const {
      customers,
      projects,
      customerId,
      projectId,
      start,
      end,
      entries,
    } = this.state;

    return (
      <Mutation
        mutation={createBill}
        onCompleted={() => {
          refetch();
          this.setState({ name: "", customerId: "" });
        }}
      >
        {(create, { loading, error }) => {
          if (error) {
            return "Error!";
          }

          console.log(this.state);
          return (
            <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
              <Paper className={classes.paper}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    create({
                      variables: {
                        customerId,
                        projectId,
                        start,
                        end
                      }
                    });
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl fullWidth className={classes.textField}>
                    <InputLabel htmlFor="select-customer">
                      Select customer
                    </InputLabel>
                    <Select
                      value={customerId}
                      onChange={e => this.selectCustomer(e.target.value)}
                      inputProps={{
                        name: "Customer",
                        id: "select-customer"
                      }}
                    >
                      {this.state.loading
                        ? "Loading"
                        : customers.map(customer => (
                            <MenuItem key={customer._id} value={customer._id}>
                              {customer.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth className={classes.textField}>
                    <InputLabel htmlFor="select-project">
                      Select project
                    </InputLabel>
                    <Select
                      disabled={customerId === "" || loading}
                      value={projectId}
                      onChange={e =>
                        this.handleChange("projectId", e.target.value)
                      }
                      inputProps={{
                        name: "Project",
                        id: "select-project"
                      }}
                    >
                      {loading
                        ? "Loading"
                        : projects.map(project => (
                            <MenuItem key={project._id} value={project._id}>
                              {project.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>

                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className={classes.root}>
                      <InlineDatePicker
                        disabled={loading}
                        className={classes.inputField}
                        label="Billing period start"
                        value={start.toDate()}
                        onChange={start => this.handleChange("start", start)}
                        ampm="false"
                        maxDate={end.toDate()}
                        format="DD.MM.YYYY"
                      />

                      <InlineDatePicker
                        disabled={loading}
                        className={classes.inputField}
                        label="Billing period end"
                        value={end.toDate()}
                        onChange={end => this.handleChange("end", end)}
                        ampm="false"
                        minDate={start.toDate()}
                        format="DD.MM.YYYY"
                      />
                    </div>
                  </MuiPickersUtilsProvider>

                  {projectId === "" ? "" : <DashboardList entries={entries} />}

                  <Button
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.textField}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    ) : (
                      "Add"
                    )}
                  </Button>
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
  inputField: {
    width: "45%",
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: "16px"
  }
}))(withApollo(CreateBill));
