// Managing auth state
/* We will define the following helper methods to store and retrieve JWT credentials from
client-side sessionStorage, and also clear out the sessionStorage on user sign-out.
*/

import { signout } from './api-auth.js'

// Save credentials on successful sign-in
const authenticate = (jwt, cb) => {
    if( typeof window !== "undefined" ) sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
}

// Retrieve credentials if signed-in
const isAuthenticated = () => {
    if ( typeof window == "undefined" ) return false
    if ( sessionStorage.getItem('jwt') ) return JSON.parse(sessionStorage.getItem('jwt'))
    else return false
}

// Delete credentials and sign out
const signout = cb => {
    if(typeof window !== "undefined")
    sessionStorage.removeItem('jwt')
    cb()
    signout()
    .then( data => {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}

export { authenticate, isAuthenticated, signout }