// Fetch for auth API
/* In order to integrate the auth API endpoints from the server with the frontend React
components, we will add methods for fetching sign-in and sign-out API endpoints.
*/

// Sign-in
/* The signin method will take user sign-in data from the view component, then use fetch
to make a POST call to verify the user with the backend. The response from the server will
be returned to the component in a promise, which may contain the JWT if sign-in was
successful.
*/
const signin = user => {
    fetch('/auth/signin/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
    .then( response => response.json() )
    .catch( err => console.log(err) )
}

// Sign-out
/* The signout method will use fetch to make a GET call to the signout API endpoint on the
server.
*/
const signout = () => {
    return fetch('/auth/signout/', {
        method: 'GET',
        })
        .then( response => response.json() )
        .catch( err => console.log(err) )
}

export { signin, signout }