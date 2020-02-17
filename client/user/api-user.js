// Fetch for User CRUD
/* We will add methods for accessing each of the user
CRUD API endpoints, which the React components can use to exchange user data with the
server and database as required.
*/

// Creating a user
/* The CREATE method will take user data from the view component, use fetch to make a
POST call to create a new user in the backend, and finally return the response from the
server to the component as a promise.
*/
const create = user => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response => response.json() )
    .catch( err => console.log(err) )
}

// Listing users
/* The LIST method will use fetch to make a GET call to retrieve all the users in the database,
and then return the response from the server as a promise to the component.
*/
const list = () => {
    return fetch('/api/users/', {
        method: 'GET',
    })
    .then( response => response.json())
    .catch( err => console.log(err) )
}

// Reading a user profile
/* The READ method will use fetch to make a GET call to retrieve a specific user by ID. Since
this is a protected route, besides passing the user ID as a parameter, the requesting
component must also provide valid credentials, which in this case will be a valid JWT
received after successful sign-in.
*/
const read = ( params, credentials ) => {
    return fetch(`/api/users/${params.userId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.t}`
        }
    })
    .then( response => response.json() )
    .catch( err => console.log(err) )
}

// Updating a user's data
/* The UPDATE method will take changed user data from the view component for a specific
user, then use fetch to make a PUT call to update the existing user in the backend. This is
also a protected route that will require a valid JWT as credential.
*/
const update = ( params, credentials, user ) => {
    return fetch(`/api/users/${params.userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.t}`
        },
        body: JSON.stringify(user)
    })
    .then( response => response.json() )
    .catch( err => console.log(err) )
}

// Deleting a user
/* The REMOVE method will allow the view component to delete a specific user from the
database, using fetch to make a DELETE call. This, again, is a protected route that will
require a valid JWT as a credential, similar to the read and update methods. The response
from the server to the delete request will be returned to the component as a promise.
*/
const remove = ( params, credentials ) => {
    return fetch(`/api/users/${params.userId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.t}`
        }
    })
    .then( response => response.json() )
    .catch( err => console.log(err) )
}

export { create, list, read, update, remove }