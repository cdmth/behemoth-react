import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { getProjects, createEntry } from '../../graphql/queries'
import { updateEntry, deleteEntry } from '../../graphql/mutations'
import * as moment from 'moment'

import { withStyles } from '@material-ui/core/styles' 
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';
import Button from '@material-ui/core/Button';

class DashboardCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      _id: '',
      projectId: '',
      start: moment(),
      end: moment(),
      description: '',
      entry: {},
      edit: false,
      initTime: true,
      creating: false
    }
  }

  handleEntryClick(entry) {
    entry.start = moment(entry.start)
    entry.end = moment(entry.end)

    this.setState({...entry, edit: entry._id !== '' ? true : false, initTime: false})
  }

  handleCreateClick(times) {
    times.start = moment(times.start)
    times.end = moment(times.end)

    const {start, end} = times

    this.setState({ start, end, edit: false, _id: '', initTime: false})
  }

  render() {
    const { classes } = this.props

    return (
      <div className="">
        <Mutation 
          mutation={this.state.edit ? updateEntry : createEntry}
          >
        {(create, { loading }) => {
          if(loading) { return "Loading" }

          const entry = () => {
            const { _id, start, end, description, projectId } = this.state
            return { _id, start, end, description, projectId }
          }

          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                this.setState({creating: true})
                create({ variables: entry() })
              }}
              autoComplete="off"
            >
            <div className="add-bar">
              <div className="">
                <div className={classes.root}>
                <Query
                  query={getProjects} 
                  fetchPolicy={"cache-and-network"}
                  >
                  {({ loading, error, data}) => {
                    if (loading) { return "Loading" }
                    if (error) { return `Error! ${error}`}

                    return (
                      <FormControl className={classes.inputField}>
                        <InputLabel htmlFor="select-project">Select project</InputLabel>
                        <Select
                          value={this.state.projectId}
                          onChange={(event) => this.setState({projectId: event.target.value})}
                          inputProps={{
                            name: 'Project',
                            id: 'select-project',
                          }}
                        >
                          {data.projects.map((project) => (
                          <MenuItem key={project._id} value={project._id}>{project.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      )
                    }}
                </Query>
                </div>

                <div className={classes.root}>
                  <TextField
                    id="standard-multiline-flexible"
                    className={classes.textField}
                    label="Description"
                    multiline={true}
                    rowsMax="6"
                    value={this.state.description}
                    onChange={(event) => this.setState({description: event.target.value})}
                    margin="normal"
                    fullWidth={true}
                  />
                </div>

                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <div className={classes.root}>
                    <InlineDateTimePicker
                      className={classes.inputField}
                      label="Start time"
                      value={this.state.start.toDate()}
                      onChange={(start) => this.setState({start})}
                      handleAccept={() => console.log("JE")}
                      ampm={false}
                      maxDate={this.state.end.toDate()}
                      format="DD.MM HH:mm"
                    />

                    <InlineDateTimePicker
                      className={classes.inputField}
                      label="End time"
                      value={this.state.end.toDate()}
                      onChange={(end) => this.setState({end})}
                      handleAccept={() => console.log("JE")}
                      ampm={false}
                      minDate={this.state.start.toDate()}
                      format="DD.MM HH:mm"
                    />
                  </div>
                </MuiPickersUtilsProvider>

                <div className={classes.root}>
                  <Button 
                    className={classes.button} 
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                    {this.state.edit ? 'Update entry' : 'Create entry'}
                  </Button>
                </div>
              </div>
              {this.state.edit ? 
              <Mutation mutation={deleteEntry}>
                {(deleteC) => (
                  <Button
                    className="button is-medium top-margin-20 is-danger is-outlined"
                    onClick={(e) => { 
                      e.preventDefault();
                      deleteC({ variables: { _id: this.state._id } 
                      });
                    }}>
                    Delete
                  </Button>)}
              </Mutation>
              : '' }
              </div>
            </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withStyles((theme) => ({
  root: {
    display: 'flex',
  },
  inputField: {
    width: '150px',
    margin: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit
  }
}))(DashboardCreate);