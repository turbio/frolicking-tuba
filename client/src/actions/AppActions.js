import { browserHistory } from 'react-router';
import { SET_AUTH } from '../utils/AppConstants';

// Sets the authentication state of the application
// @param {boolean} newState True means a user is
// logged in, false means no user is logged in

export const setAuthState = (newState) =>
  ({ type: SET_AUTH, newState });


export const handleAuthSubmit
  = ({ username, password, companyName }, endpoint) => {
    // (dispatch) => {
    //   console.log(dispatch);
    const url = `/api/${endpoint}`;
    const data = {
      email: username,
      password
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
      console.log(json, 'This is the json variable');
      //if response is success, !json will produce true
      //dispatch(setAuthState(!json));
      if (json.error) {
        console.log(json);
      } else {
        //this.router.push('/dashboard');
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => console.log('fetch error:', error));
  };
  // };

export const toggleLoggedin = () => ({ type: 'TOGGLE_LOGGEDIN' });

export const someOtherFunction = () => ({ type: 'SOME_ACTION' });
