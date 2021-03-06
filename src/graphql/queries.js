import gql from "graphql-tag";

// Get all customers
export const queryAllCustomers = gql`
  query Customers {
    customers {
      _id
      name
    }
  }
`

// Get single customer
export const queryCustomer = gql`
  query Customer($_id: String!) {
    customer(_id: $_id) {
      _id
      name
      businessId
      address
      postalCode
      country
      city
    }
  }
`

// Customers subscription
export const customersSubscription = gql`
  subscription CustomerSubscription {
    customers {
      _id
      name
    }
  }
`

// Get all workers
export const queryAllWorkers = gql`
  query Workers {
    workers {
      _id
      name
    }
  }
`

// Get single worker
export const queryWorker = gql`
  query worker($_id: String!) {
    worker(_id: $_id) {
      _id
      name
    }
  }
`

// Workers subscription
export const workersSubscription = gql`
  subscription {
    workers {
      _id
      name
    }
  }
`

// Get all projects by customer
export const queryAllProjects= gql`
  query CustomerProjects{
    customers {
      _id
      name
      projects {
        _id
        name
      }
    }
  }
`

// Get all projects subscription
export const projectsSubscription = gql`
  subscription {
    projects {
      _id
      name
    }
  }
`

export const entriesByProjectId = gql`
  query entriesByProjectId($projectId: String!) {
    entriesByProjectId(projectId: $projectId) {
      _id
      workerId
      description
      start
      end
      projectId
      worker {
        name
      }
    }
  }
`

export const getProjects = gql`
  query Projects{
    projects {
      _id
      name
    }
  }
`

export const getEntries = gql`
  query Entries {
    entries {
      _id
      projectId
      workerId
      start
      end
      description
      price
      hours
      hoursFormatted
      worker {
        name
        rate
      }
      project {
        name
      }
    }
  }
`

// Get single project
export const queryProject = gql`
    query project($_id: String!) {
      project(_id: $_id) {
        _id
        name
      }
    }
`

export const getProjectWorkers = gql`
  query project($_id: String!) {
    project(_id: $_id) {
      _id
      name
      workers {
        _id
        name
        rate
      }
    }
  }
`

export const entriesSubscription = gql`
  subscription {
    entries {
      _id
      projectId
      billId
      workerId
      start
      end
      description
    }
  }
`

export const projectWorkersSubscription = gql`
  subscription {
    projectWorkers {
      _id
      name
    }
  }
`

export const getBills = gql`
query Bills {
  bills {
    _id
    projectId
    customerId
    billingPeriodStart
    billingPeriodEnd
    hours
    price
    status
    billDate
    project {
      name
    }
    customer {
      name
    }
  }
}
`

export const getBill = gql`
query Bill($billId: String!) {
  bill(billId: $billId) {
    _id
    projectId
    customerId
    billingPeriodStart
    billingPeriodEnd
    hours
    price
    status
    billDate
    project {
      name
    }
    customer {
      name,
      address,
      businessId,
      postalCode,
      city,
      country
    }
    entries {
      _id
      workerId
      start
      end
      description
      price
      hours
      hoursFormatted
      worker {
        name
        rate
      }
    }
  }
}
`

export const getProjectsAndEntries = gql`
query {
  projects {
    _id
    customerId
    name
    entries {
      start 
      end
      description
      price
      bill {
        _id
        status
      }
    }
  }
}
`

export const entriesByProjectIdAndTimeRange = gql`
query EntriesByProjectIdAndTimeRange($projectId: String!, $start: String!, $end: String!){
  entriesByProjectIdAndTimeRange(projectId: $projectId, start: $start, end: $end) {
    _id
    projectId
    start
    end
    description
    price
    worker {
      name
      rate
    }
    project {
      name
    }
  }
}
`

export const unbilledEntriesInProjects = gql`
query unbilledEntriesInProjects {
	unbilledEntriesInProjects {
    project {
      name
      _id
    }
    entries {
      _id
      start
      end
      description
      price
      hours
      hoursFormatted
      worker {
        name
        rate
      }
    }
  }
}
`