import React from "react";
import { Mutation } from "react-apollo";
import { addWorker } from "../../graphql/mutations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";

import TitleBar from "../../partials/TitleBar";

class CreateWorker extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, refetch } = this.props;

    return (
      <Mutation
        mutation={addWorker}
        onCompleted={data => {
          refetch();
          this.setState({ name: "" });
        }}
      >
        {(create, { loading, error }) => {
          if (error) {
            return "Error!";
          }
          return (
            <Slide direction="left" in={!loading} mountOnEnter unmountOnExit>
              <div>
                <TitleBar title="Create worker" push="/workers" />
                <Paper className={classes.paper}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      create({ variables: { name: this.state.name } });
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
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
}))(CreateWorker);
