import AppDispatcher from './../AppDispatcher.js';
import ProjectConstants from './../constants/ProjectConstants.js';

export default {
    getProfile: () => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.GET_PROFILE
        });
    },
    getProjects: () => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.GET_PROJECTS
        });
    }
}