import { browserHistory } from 'react-router';
import { SIGN_OUT_USER,
  AUTH_USER, AUTH_ERROR,
  FETCH_KEYS, OPEN_MODAL,
  CLOSE_MODAL, FETCH_ENDPOINTS,
  ADD_NEW_ENDPOINT, UPDATE_GITHUB_AUTH,
  FETCH_URLS, UPDATE_GITHUB_STATUS,
  FETCH_REPOS, SET_MODAL_MODE,
  OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL,
  SET_EDIT_MODAL_MODE
} from '../utils/AppConstants';

export const authUser = (email) => ({
  type: AUTH_USER,
  email
});
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
export const setModalModeAddUrl = (mode) => ({
  type: SET_MODAL_MODE,
  modalModeAddUrl: mode
});
export const showEditModal = (key) => ({
  type: OPEN_EDIT_MODAL,
  key
});
export const hideEditModal = () => ({ type: CLOSE_EDIT_MODAL });
export const setEditModalNewUrl = (mode) => ({
  type: SET_EDIT_MODAL_MODE,
  mode
});
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
        dispatch(authUser(credentials.email));
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
    fetch('/api/keys', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => dispatch(requestKeys(json)))
    .catch((error) => dispatch(authError(error)));
  }
);

export const fetchUrls = () => ((dispatch) => {
  fetch('/api/urls', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((urls) => {
    dispatch({ type: FETCH_URLS, urls });
  })
  .catch((err) => {
    console.log(err);
  });
});

const fetchRepos = () => (
  fetch('/api/github/repos', { credentials: 'same-origin' })
  .then((response) => response.json())
);

export const fetchGithubAuthStatus = () => ((dispatch) => {
  fetch('/api/users/hasgithub', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((res) => {
    console.log('github status:', res);
    dispatch({ type: UPDATE_GITHUB_STATUS, status: res.github });

    return fetchRepos();
  })
  .then((repos) => {
    if (repos.error) {
      dispatch({ type: FETCH_REPOS, repos: [] });
    } else {
      dispatch({ type: FETCH_REPOS, repos });
    }
  })
  .catch((err) => {
    console.log(err);
  });
});

//*******Modal Related Actions*******//


export const createNewUrl = (urlObject) => (
 fetch('/api/urls', {
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

export const createNewKey = ({ key, name, type, endpoint }) => (
  (dispatch) => {
    const requestBody = {
      name,
      type,
      endpoint
    };

    if (key) {
      requestBody.key = key;
    }

    //make the API Key
    fetch('/api/keys', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(requestBody)
    })
    .then(() => {
      if (type === 'url') {
        return createNewUrl({ url: endpoint });
      }

      return null;
    })
    .then(() => {
      dispatch(getApiKeys());
      dispatch(fetchUrls());
      dispatch(fetchGithubAuthStatus());
      dispatch(setModalModeAddUrl(false));
      dispatch(hideModal());
      dispatch(hideEditModal());
      browserHistory.replace('/dashboard');
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

