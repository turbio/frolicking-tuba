import { browserHistory } from 'react-router';
import { SIGN_OUT_USER,
  AUTH_USER, AUTH_ERROR,
  FETCH_KEYS, OPEN_MODAL,
  CLOSE_MODAL, FETCH_ENDPOINTS } from '../utils/AppConstants';

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
export const fetchEndpts = (keys) => ({
  type: FETCH_ENDPOINTS,
  payload: keys
});

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
      if (json.error) {
        dispatch(authError(json.error));
      } else {
        // console.log(json,'signedin')
        localStorage.token = true;
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
      //localStorage.token = false;
      //delete localStorage.token;
      Reflect.deleteProperty(localStorage, 'token');

      dispatch(authRemove());
      browserHistory.replace('/');

    })
    .catch((error) => console.log('fetch error:', error));
  }
 );

export const getApiKeys = () => {
  console.log('it reaches here');

  return (dispatch) => {
    console.log('reach get apikeys');

    fetch('/api/keys', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {

      const keys = json.map((key) => {
        const newKey = key;

        newKey.api_key = `<script src="http://getmarkup.com/script.js?key=\
${key.api_key}"></script>`;

        return newKey;
      });

      console.log(keys, 'the keys');

      dispatch(requestKeys(keys));
      //dispatch(fetchEndpts({ name: 'sean' }));

    })
    .catch((error) => dispatch(authError(error)));
  };
};

// export const fetchEndpts = () => ({
//   type: FETCH_ENDPOINTS,
//   payload: getApiKeys()
// });

// export const checkAuth = () => {
//   (dispatch) => {
//     fetch('/api/users/signedin', { credentials: 'same-origin' })
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json, 'testing json return for checkAuth');

//       if (json.signedin) {
//         localStorage.token = true;
//         dispatch(authUser());
//       } else {
//         dispatch(logOut());
//       }
//     });
//   };
// };


// export const fetchEndpoints = () => {
//   (dispatch) => {
//     let githubrepos = [];

//     console.log('this gets called');
//     fetch('/api/integrations/github/repos', { credentials: 'same-origin' })
//     .then((response) => response.json())
//     .then((fetchedgithubrepos) => {
//       githubrepos = fetchedgithubrepos;
//       console.log(fetchedgithubrepos, 'repos');

//       return fetch('/api/integrations/urls/urls',
//         { credentials: 'same-origin' });
//     })
//     .then((response) => response.json())
//     .then((urls) => {
//       console.log('json:', githubrepos, urls, githubrepos.concat(urls));
//       dispatch({
//         type: FETCH_ENDPOINTS,
//         payload: githubrepos.concat(urls)
//       });
//         //this.setState({ githubRepos: json });
//         //this.setState({ sel_repo: json[0] });
//     })
//     .catch((error) => console.log('fetch repos', error));

//   };

// };

// export const setKeyWithGithub = () => {
//   (dispatch) => {

//   };
// };

// export const setKeyWithUrl = (values) => {
//   console.log(values, 'reached here');
//   // (dispatch) => {

//   // };
// };

// export const handleEndpointSubmit = (values) => {
//   //if url do one thing, if github repo do another
//   if (values.endpoint.includes('url:')) {
//     console.log('we reached setkey');
//     setKeyWithUrl(values);
//   }
// };

