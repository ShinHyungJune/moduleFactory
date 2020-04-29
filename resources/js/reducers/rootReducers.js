import {combineReducers} from "redux";
import commonReducers from './commonReducers';
import moduleReducers from "./moduleReducers";

export default combineReducers({
    commonStates: commonReducers,
    moduleStates: moduleReducers,
})
