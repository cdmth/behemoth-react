import React from "react";
import { Mutation } from "react-apollo";
import { addCustomer } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";

import TitleBar from "../../partials/TitleBar";

class CreateCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      businessId: "",
      address: "",
      postalCode: "",
      city: "",
      country: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, refetch } = this.props;
    const { name, businessId, address, postalCode, city, country } = this.state;

    return (
      <Mutation
        mutation={addCustomer}
        onCompleted={data => {
          refetch();
          this.setState({
            name: "",
            businessId: "",
            address: "",
            postalCode: "",
            city: "",
            country: ""
          });
        }}
      >
        {(create, { loading, error }) => {
          if (error) {
            return "Error!";
          }
          return (
            <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
              <div>
                <TitleBar title="Create customer" push="/customers" />
                <Paper className={classes.paper}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      create({
                        variables: {
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
                        "Add"
                      )}
                    </Button>
                  </form>
                </Paper>{" "}
              </div>
            </Slide>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(CreateCustomer);
