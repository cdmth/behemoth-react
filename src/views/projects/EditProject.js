import React from 'react'
import { withApollo, Mutation } from 'react-apollo';
import { queryProject } from '../../graphql/queries'
import { updateProject, deleteProject } from '../../graphql/mutations'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

class EditProject extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      loading: true
    }

    this.fetchData(props); 
  }

  componentWillReceiveProps(next) {
    this.fetchData(next);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  async fetchData(props) {
    const { client } = props;
    const result = await client.query({
      query: queryProject, variables: {_id: props.match.params.id}
    });

    this.setState({
      name: result.data.project.name,
      _id: result.data.project._id,
      loading: false,
    });
  }

  render() {
    const { classes, refetch } = this.props
    const { _id } = this.state;

    console.log(this.state)

    return (
      <Mutation mutation={updateProject}
      onCompleted ={() => {
        refetch()
        this.setState({name: '', _id: ''})
      }}>
      {(edit, { loading, error }) => {
        if(error) { return 'Error!' }
        return (
        <Slide direction="left" in={!this.state.loading} mountOnEnter unmountOnExit>
          <Paper className={classes.paper}>
            <form
              onSubmit={e => {
                e.preventDefault();
                console.log(_id)
                edit({ variables: {_id, name: this.state.name} }) }}
              noValidate
              autoComplete="off">
              <FormControl margin="normal" required fullWidth>
                <TextField
                  required
                  disabled={loading}
                  id="standard-name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </FormControl>
              <Button 
                disabled={loading}
                variant="contained" 
                color="primary" 
                type="submit">
                {loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : "Update"}
              </Button>
              <Mutation 
                mutation={deleteProject}
                onCompleted ={() => {
                  refetch()
                  this.setState({name: '', _id: ''})
                }}
              >
                {(deleteC, {loading}) => (
                  <Button 
                    disabled={loading}
                    variant="contained" 
                    color="secondary" 
                    onClick={() => deleteC({ variables: { _id }})}>
                    {loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : "Delete"}
                  </Button>
                )}
              </Mutation>
            </form>
          </Paper>
        </Slide>
        )
      }}
    </Mutation>
    )}

};

export default withStyles((theme) => ({
  root: {
    paddingTop: "20px"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  }
}))(withApollo(EditProject))