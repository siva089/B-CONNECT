import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import dashboard from './dashboard'
export default combineReducers({
alert,
auth,
dashboard
})