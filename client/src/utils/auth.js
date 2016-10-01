
const checkAuth = (callback) => {
  fetch('/api/users/signedin', { credentials: 'same-origin' })
  .then((response) => response.json())
  .then((json) => {
    localStorage.token = json.signedin;
    callback(null, json.signedin);

    return;
  })
  .catch((error) => console.log('fetch /api/me error:', error));
};

export const auth = {
  // onEnter hook for Dashboard route
  dashboardOnEnter(nextState, replace, callback) {
    // check if authenticated
    checkAuth((err, signedin) => {
      if (err) {
        console.log(err);
      }
      if (!signedin) {
        replace({ pathname: '/signin' });
      }
      callback();
    });
  },

  createOnEnter(nextState, replace, callback) {
    // check if authenticated
    checkAuth((err, signedin) => {
      if (err) {
        console.log(err);
      }
      if (!signedin) {
        replace({ pathname: '/signin' });
      }
      callback();
    });
  },

  githubOnEnter(nextState, replace, callback) {
    console.log('test githubOnEnter');
    callback();
  },

  loggedIn() {
    return !!localStorage.token;
  }

};

export default checkAuth;
