import { combineReducers } from 'redux';
import buildings from './reducers/buildings';
import status from './reducers/status';
import gradeLevels from './reducers/gradeLevels';
import faculties from './reducers/faculties';
// import router from './reducers/router'

export default combineReducers({
    buildings,
    status,
    gradeLevels,
    faculties
    // router
});
