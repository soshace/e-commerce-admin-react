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
    },
    addProject: (name, slug, currency, language) => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.ADD_PROJECT,
            data: {name, slug, currency, language}
        });
    },
    updateProject: (id, data) => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.UPDATE_PROJECT,
            data: {id, data}
        });
    }
}