import React from 'react'
import { Mutation } from 'react-apollo';
import { addCustomer } from '../../graphql/mutations'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';


class CreateCustomer extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, refetch, history } = this.props

    return (
      <Mutation mutation={addCustomer} onCompleted ={data => {
        refetch()
        history.push(`/customers/${data.createCustomer._id}`)
      }}>
        {(create, { loading, error }) => {
          if(loading) { return 'Loading' }
          if(error) { return 'Error!' }
          return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                create({ variables: { name: this.state.name} }) }}
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
              <Button variant="contained" color="primary" type="submit">Add customer</Button>
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
  }
}))(CreateCustomer)