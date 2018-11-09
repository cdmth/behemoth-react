import React from "react";
import { withApollo, Mutation } from "react-apollo";
import { queryCustomer } from "../../graphql/queries";
import { updateCustomer, deleteCustomer } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";

import TitleBar from "../../partials/TitleBar";

class EditCustomer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      loading: true
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
    const result = await client.query({
      query: queryCustomer,
      variables: { _id: props.match.params.id }
    });

    this.setState({
      name: result.data.customer.name,
      _id: result.data.customer._id,
      businessId: result.data.customer.businessId,
      address: result.data.customer.address,
      postalCode: result.data.customer.postalCode,
      city: result.data.customer.city,
      country: result.data.customer.country,
      loading: false
    });
  }

  render() {
    const { classes, refetch } = this.props;
    const {
      _id,
      name,
      businessId,
      address,
      postalCode,
      city,
      country
    } = this.state;

    return (
      <Mutation
        mutation={updateCustomer}
        onCompleted={data => {
          refetch();
          this.setState({
            name: data.updateCustomer.name,
            businessId: data.updateCustomer.businessId,
            address: data.updateCustomer.address,
            postalCode: data.updateCustomer.postalCode,
            city: data.updateCustomer.city,
            country: data.updateCustomer.country
          });
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
              <div>
                <TitleBar title={`Edit ${this.state.name}`} push="/customers" />
                <Paper className={classes.paper}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      edit({
                        variables: {
                          _id,
                          name,
                          businessId,
                          address,
                          postalCode,
                          city,
                          country
                        }
                      });
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl margin="normal" required fullWidth>
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
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="standard-businessId"
                        label="VAT number"
                        className={classes.textField}
                        value={this.state.businessId}
                        onChange={this.handleChange("businessId")}
                        margin="normal"
                      />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="standard-address"
                        label="Address"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleChange("address")}
                        margin="normal"
                      />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="standard-postalCode"
                        label="Postal code"
                        className={classes.textField}
                        value={this.state.postalCode}
                        onChange={this.handleChange("postalCode")}
                        margin="normal"
                      />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="standard-city"
                        label="City"
                        className={classes.textField}
                        value={this.state.city}
                        onChange={this.handleChange("city")}
                        margin="normal"
                      />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="standard-country"
                        label="Country"
                        className={classes.textField}
                        value={this.state.country}
                        onChange={this.handleChange("country")}
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
                        "Update"
                      )}
                    </Button>
                    <Mutation
                      mutation={deleteCustomer}
                      onCompleted={() => {
                        refetch();
                        this.setState({ name: "" });
                      }}
                    >
                      {(deleteC, { loading }) => (
                        <Button
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
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(withApollo(EditCustomer));
