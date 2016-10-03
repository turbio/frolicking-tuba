import { browserHistory } from 'react-router';
import { SIGN_OUT_USER, AUTH_USER, AUTH_ERROR } from '../utils/AppConstants';


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

    console.log(data, 'the data');
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
      console.log(json, 'json');
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


export const logOut = () => (
  (dispatch) => {
    fetch('/api/users/signout', { credentials: 'same-origin' })
    .then(() => {
      dispatch(signOut());
      browserHistory.replace('/');
    })
    .catch((error) => console.log('fetch error:', error));
  }
 );
