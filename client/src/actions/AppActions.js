import { browserHistory } from 'react-router';
import { SIGN_OUT_USER,
  AUTH_USER, AUTH_ERROR,
  FETCH_KEYS, OPEN_MODAL,
  CLOSE_MODAL, FETCH_ENDPOINTS,
  ADD_NEW_ENDPOINT, UPDATE_GITHUB_AUTH } from '../utils/AppConstants';

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

export const addNewEndpt = () => ({ type: ADD_NEW_ENDPOINT });
export const updateGitHubAuth = () => ({ type: UPDATE_GITHUB_AUTH });


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
${key.key}"></script>`;

        return newKey;
      });

      dispatch(requestKeys(keys));
    })
    .catch((error) => dispatch(authError(error)));
  }
);


//*******Modal Related Actions*******//

export const fetchEndpoints = () => (
  (dispatch) => {
    let githubrepos = [];

    fetch('/api/users/hasgithub', { credentials: 'same-origin' })
    .then((response) => {
      console.log(response, 'response fromgithub');

      return response.json();
    })
    .then((auth) => {
      if (auth.github) {
        console.log('reached auth.github');
        dispatch(updateGitHubAuth());

        return fetch(
          '/api/github/repos', { credentials: 'same-origin' }
          )
        .then((response) => response.json());
      }

      return [];
    })
    .then((repos) => {
      githubrepos = repos;

      return fetch('/api/urls',
        { credentials: 'same-origin' });
    })
    .then((response) => response.json())
    .then((urls) => {
      const mappedrepos = githubrepos.map((repo) => {
        const obj = {};

        obj.type = 'github';
        obj.name = repo.full_name;

        return obj;
      });

      const mappedurls = urls.map((url) => {
        const obj = {};

        obj.type = 'url';
        obj.name = url.url;

        return obj;
      });

      dispatch({
        type: FETCH_ENDPOINTS,
        payload: mappedrepos.concat(mappedurls)
      });
    })
    .catch((error) => console.log('fetchEndpoints error', error));
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
  // (dispatch) => {
  //console.log('inupdatekey');

    fetch('/api/keys', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(requestBody)
    })
    .then((response) => response.json())
    .then(() => {
      console.log('in updateKey');

      //dispatch(hideModal());
    })
    .catch((error) => {
      console.log('error in updateKey:', error);
      //dispatch(error);
    })
  // }
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
        key: key.key,
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
      dispatch(hideModal());
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

