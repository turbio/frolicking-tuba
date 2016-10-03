import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers/reducers';


const storeConfig = () => (
  createStore(
    rootReducer,
    {},
    compose(
      autoRehydrate(),
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (fe) => fe
    )
  )
);

export default storeConfig;
