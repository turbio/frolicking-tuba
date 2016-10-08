// //import checkAuth from '../actions/AppActions';
// // const checkAuth = () => {
// //   fetch('/api/users/signedin', { credentials: 'same-origin' })
// //   .then((response) => response.json())
// //   .then((json) => {
// //     console.log(json, 'checkauth');
// //     //callback(null, json.signedin);
// //     if (json.signedin) {
// //       localStorage.token = json.signedin;

// //       return true;
// //     }

// //     return false;
// //   })
// //   .catch((error) => console.log('fetch /api/me error:', error));
// // };

// export const loggedIn = () => (!!localStorage.token);

// export const requireAuth = (nextState, replace) => {
//   console.log(loggedIn(), 'testlocalstorage', nextState);

//   if (!loggedIn()) {
//     console.log('does it reach this check?');

//     replace({
//       pathname: '/signin',
//       state: { nextPathname: nextState.location.pathname }
//     });
//   }
// };


// export const auth = {
//   // onEnter hook for Dashboard route
//   requireAuth(nextState, replace) {
//     // check if authenticated
//     // console.log('dashboard on enter', callback, nextState);
//     // checkAuth((err, signedin) => {
//     //   if (err) {
//     //     console.log(err);
//     //   }
//     //   if (!signedin) {
//     //     replace({ pathname: '/signin' });
//     //   }
//     //   callback();
//     // });
//     if (!loggedIn()) {
//       replace({
//         pathname: '/signin',
//         state: { nextPathname: nextState.location.pathname }
//       });
//     }
//   },

//   createOnEnter(nextState, replace, callback) {
//     // check if authenticated
//     checkAuth((err, signedin) => {
//       if (err) {
//         console.log(err);
//       }
//       if (!signedin) {
//         replace({ pathname: '/signin' });
//       }
//       callback();
//     });
//   },

//   githubOnEnter(nextState, replace, callback) {
//     console.log('test githubOnEnter');
//     callback();
//   },

//   loggedIn() {
//     return !!localStorage.token;
//   }

//   // logout(callback) {
//   //   fetch('/api/users/signout', { credentials: 'same-origin' })
//   //   .then(() => callback(true)
//   //   );
//   // }
// };

//export default checkAuth;
