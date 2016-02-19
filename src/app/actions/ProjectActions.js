import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getProjects: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PROJECTS
        });
    },
    getCompanyProjects: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_COMPANY_PROJECTS,
            id: id
        });
    },
    createProject: (name, slug, currency, language, company) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_PROJECT,
            data: {name, slug, currency, language, company}
        });
    },
    updateProject: (id, data) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PROJECT,
            //TODO make only one arg
            data: {id, data}
        });
    },
    deleteProject: (project) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.DELETE_PROJECT,
            project: project
        });
    }
}