import React from 'react'
import { Query } from 'react-apollo'
import { queryCustomer } from '../../graphql/queries'

const Customer = (props) => {
  return (
    <Query query={queryCustomer} variables={{_id: props.match.params.id}}>
      {({loading, error, data}) => {
        if(loading) { return "Loading"}
        if(error) { return "Error"}
        
        return (
          <div>
            <h2>{data.customer.name}</h2>
          </div>  
        )
      }}
    </Query>
  )
}

export default Customer