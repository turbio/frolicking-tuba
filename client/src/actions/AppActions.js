import { browserHistory } from 'react-router';
import { SIGN_OUT_USER, AUTH_USER, AUTH_ERROR } from '../utils/AppConstants';


// Sets the authentication state of the application
// @param {boolean} newState True means a user is
// logged in, false means no user is logged in

export const authUser = () => ({ type: AUTH_USER });
export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error
});
export const signOut = () => ({ type: SIGN_OUT_USER });

export const signInUser = (credentials, endpoint) => (
  (dispatch) => {
    const url = `/api${endpoint}`;

    console.log(url);
    const data = {
      email: credentials.email,
      password: credentials.password
    };

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    fetch(url, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      //if response is success, !json will produce true
      //dispatch(setAuthState(!json));
      if (json.error) {
        dispatch(authError(json.error));
      } else {
        //this.router.push('/dashboard');
        dispatch(authUser());
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => {
      console.log('fetch error:', error);
      dispatch(authError(error));
    });
  }
);


export const logout = () => (
  (dispatch) => {
    fetch('/api/users/signout', { credentials: 'same-origin' })
    .then(() => {
      dispatch(signOut());
      browserHistory.replace('/');
      //return { type: SIGN_OUT_USER };
    })
    .catch((error) => console.log('fetch error:', error));
  }
 );


// export const toggleLoggedin = () => ({ type: 'TOGGLE_LOGGEDIN' });

// export const someOtherFunction = () => ({ type: 'SOME_ACTION' });
