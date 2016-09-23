import { combineReducers } from 'redux';
import loggedin from './loggedin';

const dashboard = combineReducers({ loggedin });

export default dashboard;
