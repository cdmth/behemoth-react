import React from "react";
import { withApollo, Mutation } from "react-apollo";
import { queryAllCustomers } from "../../graphql/queries";
import { addProject } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import TitleBar from "../../partials/TitleBar";

class CreateCustomer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      customerId: '',
      loading: true
    };

    this.fetchData(props);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  async fetchData(props) {
    const { client } = props;
    const result = await client.query({
      query: queryAllCustomers
    });

    this.setState({
      customers: result.data.customers,
      loading: false
    });
  }

  render() {
    const { classes, refetch } = this.props;
    const { customers, customerId, name } = this.state;

    return (
      <Mutation
        mutation={addProject}
        onCompleted={() => {
          refetch();
          this.setState({ name: '', customerId: '' });
        }}
      >
        {(create, { loading, error }) => {
          if (error) {
            return "Error!";
          }
          return (
            <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
            <div>
            <TitleBar title="Create project" push="/projects" />
              <Paper className={classes.paper}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    create({ variables: { name, customerId } });
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
                      onChange={this.handleChange("customerId")}
                      inputProps={{
                        name: "Customer",
                        id: "select-customer"
                      }}
                    >
                      {this.state.loading ? "Loading" : customers.map(customer => (
                        <MenuItem key={customer._id} value={customer._id}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      required
                      id="standard-name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      margin="normal"
                    />
                  </FormControl>
                  <Button
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
                      "Add"
                    )}
                  </Button>
                </form>
              </Paper>
              </div>
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
    width: '150px',
    margin: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: '16px'
  }
}))(withApollo(CreateCustomer));
