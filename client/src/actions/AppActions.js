import { browserHistory } from 'react-router';
import { SIGN_OUT_USER,
  AUTH_USER, AUTH_ERROR,
  FETCH_KEYS, OPEN_MODAL,
  CLOSE_MODAL } from '../utils/AppConstants';


export const authUser = () => ({ type: AUTH_USER });
export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error
});
export const authRemove = () => ({ type: SIGN_OUT_USER });

export const requestKeys = (keys) => ({
  type: FETCH_KEYS,
  payload: keys
});
export const showModal = () => ({ type: OPEN_MODAL });
export const hideModal = () => ({ type: CLOSE_MODAL });


export const signInUser = (credentials, endpoint) => (
  (dispatch) => {
    const url = `/api${endpoint}`;
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
      console.log(json, 'json');
      if (json.error) {
        dispatch(authError(json.error));
      } else {
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
      dispatch(authRemove());
      browserHistory.replace('/');
    })
    .catch((error) => console.log('fetch error:', error));
  }
 );

export const getApiKeys = () => {
  (dispatch) => {
    fetch('/api/keys', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {

      const keys = json.map((key) => {
        const newKey = key;

        newKey.api_key = `<script src="http://getmarkup.com/script.js?key=\
                          ${key.api_key}"></script>`;

        return newKey;
      });

      dispatch(requestKeys(keys));
      //this.setState({ keys });
    })
    .catch((error) => console.log('fetch /api/keys error:', error));
  };
};

export const fetchEndpoints = () => {
  (dispatch) => {

  };
};

export const handleEndpointSubmit = () => {
  //if url do one thing, if github repo do another
};

export const setKeyWithGithub = () => {
  (dispatch) => {

  };
};

export const setKeyWithUrl = () => {
  (dispatch) => {

  };
};

