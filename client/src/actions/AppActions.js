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

const headers = new Headers();

headers.append('Content-Type', 'application/json');

export const signInUser = (credentials, endpoint) => (
  (dispatch) => {
    const url = `/api${endpoint}`;
    const data = {
      email: credentials.email,
      password: credentials.password
    };

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

export const getApiKeys = () => (
  (dispatch) => {
    console.log('reach get apikeys');
    fetch('/api/keys', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => {

      const keys = json.map((key) => {
        const newKey = key;

        newKey.api_key = `<script src="https://getmarkup.com/script.js?key=\
${key.api_key}"></script>`;

        return newKey;
      });

      console.log(keys, 'the keys');

      dispatch(requestKeys(keys));
      //dispatch(fetchEndpts({ name: 'sean' }));

    })
    .catch((error) => dispatch(authError(error)));
  }
);


//*******Modal Related Actions*******//

export const fetchEndpoints = () => (
  (dispatch) => {
    let githubrepos = [];

    fetch('/api/user/hasgithub', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((auth) => {
      console.log(auth, 'thegithubauth status');

      if (auth.github) {
        return fetch(
          '/api/github/repos', { credentials: 'same-origin' }
          );
      }

      return [];
    })
    .then((response) => response.json())
    .then((repos) => {
      console.log(repos, 'thegithub repos');
      githubrepos = repos;

      return fetch('/api/urls',
        { credentials: 'same-origin' });
    })
    .then((response) => response.json())
    .then((urls) => {
      console.log('json:', githubrepos, urls, githubrepos.concat(urls));
      dispatch({
        type: FETCH_ENDPOINTS,
        payload: githubrepos.concat(urls)
      });
    })
    .catch((error) => console.log('fetchEndoints error', error));
  }
);

export const createNewUrl = (urlObject) => (
 fetch('/api/keys', {
   method: 'POST',
   headers,
   credentials: 'same-origin',
   body: JSON.stringify(urlObject)
 })
);

export const updateKey = (requestBody) => (
  (dispatch) => {

    fetch('/api/keys', {
      method: 'PUT',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(requestBody)
    })
    .then((response) => response.json())
    .then(() => {
      dispatch();
    })
    .catch((error) => {
      console.log('error in updateKey:', error);
      dispatch(error);
    });
  }
);

export const createNewKey = (name, type, endpoint) => (
  (dispatch) => {
    let requestBody = {};

    //make the API Key
    fetch('/api/keys', {
      method: 'POST',
      headers,
      credentials: 'same-origin'
    })
    .then((response) => response.json())
    .then((key) => {
      requestBody = {
        name,
        key,
        type,
        endpoint
      };

      if (type === 'url') {
        return createNewUrl({ url: endpoint });
      }

      return null;
    })
    .then(() => {
      updateKey(requestBody);
    })
    .catch((error) => {
      console.log('error in createnewkey:', error);
      dispatch(error);
    });
  }
);


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

