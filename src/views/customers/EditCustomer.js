import React from 'react'
import { withApollo, Mutation } from 'react-apollo';
import { queryCustomer } from '../../graphql/queries'
import { updateCustomer, deleteCustomer } from '../../graphql/mutations'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';


class EditCustomer extends React.Component {
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
      query: queryCustomer, variables: {_id: props.match.params.id}
    });

    this.setState({
      name: result.data.customer.name,
      _id: result.data.customer._id,
      loading: false,
    });
  }

  render() {
    const { classes, refetch, history } = this.props
    const { loading, _id } = this.state;

    console.log(_id)

    if(loading) { return "Loading" }

    return (
      <Mutation mutation={updateCustomer}
      onCompleted ={data => {
        refetch()
        history.push(`/customers/${data.updateCustomer._id}`)
      }}>
      {(edit, { loading, error }) => {
        if(loading) { return 'Loading' }
        if(error) { return 'Error!' }
        return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              edit({ variables: {_id, name: this.state.name} }) }}
            noValidate
            autoComplete="off">
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="standard-name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </FormControl>
            <Button variant="contained" color="primary" type="submit">Update</Button>
            <Mutation 
              mutation={deleteCustomer}
              onCompleted ={() => {
                refetch()
                history.push(`/customers/`)
              }}
            >
              {(deleteC) => (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => deleteC({ variables: { _id }})}>Delete Customer
                </Button>
              )}
            </Mutation>
          </form>
        </div>
        )
      }}
    </Mutation>
    )}

};

export default withStyles((theme) => ({
  root: {
    paddingTop: "20px"
  },

}))(withApollo(EditCustomer))