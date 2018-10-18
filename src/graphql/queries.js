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

// Get single project
export const queryProject = gql`
    query project($_id: String!) {
      project(_id: $_id) {
        name
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

export const getProjectWorkers = gql`
  query project($projectId: String!) {
    project(_id: $projectId) {
      workers {
        _id
        name
      }
    }
  }
`

export const createEntry = gql`
  mutation CreateEntry($projectId: String!, $workerId: String!, $start: String, $end: String, $description: String) {
    createEntry(projectId: $projectId, workerId: $workerId, start: $start, end: $end, description: $description) {
      projectId
      workerId
      start
      end
      description
    }
  }
`

export const entriesSubscription = gql`
  subscription {
    entries {
      _id
      projectId
      workerId
      start
      end
      description
    }
  }
`

export const deleteWorker = gql`
  mutation deleteWorkerFromProject($workerId: String!, $projectId: String!) {
    deleteWorkerFromProject(workerId: $workerId, projectId: $projectId) {
      message
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

export const addProjectWorker = gql`
  mutation addWorkerToProject($workerId: String!, $projectId: String!, $rate: Float) {
    addWorkerToProject(workerId: $workerId, projectId: $projectId, rate: $rate) {
      message
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