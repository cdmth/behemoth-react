import gql from "graphql-tag";

// Adds Customer
export const addCustomer = gql`
  mutation CreateCustomer($name: String, $businessId: String, $address: String, $postalCode: String, $city: String, $country: String) {
    createCustomer(name: $name, businessId: $businessId, address: $address, postalCode: $postalCode, city: $city, country: $country) {
      _id
      name
      businessId
      address
      postalCode
      country
      city
    }
  }
`;

// Update Customer
export const updateCustomer = gql`
  mutation updateCustomer($_id: String!, $name: String!, $businessId: String, $address: String, $postalCode: String, $city: String, $country: String) {
    updateCustomer(_id: $_id, name: $name, businessId: $businessId, address: $address, postalCode: $postalCode, city: $city, country: $country) {
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

// Delete Customer
export const deleteCustomer = gql`
mutation deleteCustomer($_id: String!) {
  deleteCustomer(_id: $_id) {
    message
  }
}
`

// Add worker
export const addWorker = gql`
  mutation CreateWorker($name: String) {
    createWorker(name: $name) {
      _id
      name
    }
  }
`;

// Update worker 
export const updateWorker = gql`
  mutation updateWorker($_id: String!, $name: String) {
    updateWorker(_id: $_id, name: $name) {
      name
    }
  }
`

export const updateProjectWorker = gql`
  mutation updateProjectWorker($projectId: String!, $workerId: String!, $rate: String) {
    updateProjectWorker(projectId: $projectId, workerId: $workerId, rate: $rate) {
      projectId
      workerId
      rate
    }
  }
`

// Delete worker 
export const deleteWorker = gql`
mutation deleteWorker($_id: String!) {
  deleteWorker(_id: $_id) {
    message
  }
}
`

// Add project
export const addProject = gql`
  mutation CreateProject($name: String, $customerId: String!) {
    createProject(name: $name, customerId: $customerId) {
      _id
      name
      customerId
    }
  }
`

// Update project
export const updateProject = gql`
  mutation updateProject($_id: String!, $name: String!) {
    updateProject(_id: $_id, name: $name) {
      _id
      name
    }
  }
`

// Delete project
export const deleteProject = gql`
mutation deleteProject($_id: String!) {
  deleteProject(_id: $_id) {
    message
  }
}
`

// Update entry
export const updateEntry = gql`
  mutation updateEntry($_id: String!, $projectId: String, $workerId: String, $start: String, $end: String, $description: String) {
    updateEntry(_id: $_id, projectId: $projectId, workerId: $workerId, start: $start end: $end, description: $description) {
      _id
      projectId
      workerId
      start
      end
      description
    }
  }
`

// Delete entry
export const deleteEntry = gql`
mutation deleteEntry($_id: String!) {
  deleteEntry(_id: $_id) {
    message
  }
}
`

export const createBill = gql`
mutation CreateBill($customerId: String!, $projectId: String!, $start: String!, $end: String!) {
  createBill(customerId: $customerId, projectId: $projectId, billingPeriodStart: $start, billingPeriodEnd: $end) {
    billingPeriodStart
    billingPeriodEnd
    hours
    price
    status
  }
}
`

export const createBillFromUnbilled = gql`
mutation createBillFromUnbilled($projectId: String!) {
  createBillFromUnbilled(projectId: $projectId) {
    billingPeriodStart
    billingPeriodEnd
    hours
    price
    status
  }
}
`

export const deleteBill = gql`
mutation DeleteBill($_id: String!) {
  deleteBill(_id: $_id) {
    _id
  }
}
`

export const createAccount = gql`
mutation CreateAccount($email: String!, $password: String!) {
  createAccount(email: $email, password: $password) {
    token
  }
}
`

export const login = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
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

export const addProjectWorker = gql`
  mutation addWorkerToProject($workerId: String!, $projectId: String!, $rate: Float) {
    addWorkerToProject(workerId: $workerId, projectId: $projectId, rate: $rate) {
      message
    }
  }
`

export const deleteProjectWorker = gql`
  mutation deleteWorkerFromProject($workerId: String!, $projectId: String!) {
    deleteWorkerFromProject(workerId: $workerId, projectId: $projectId) {
      message
    }
  }
`