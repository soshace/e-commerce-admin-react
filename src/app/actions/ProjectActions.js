import AppDispatcher from './../AppDispatcher.js';
import ProjectConstants from './../constants/ProjectConstants.js';

export default {
    getProjects: () => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.GET_PROJECTS
        });
    },
    getCompanyProjects: (id) => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.GET_COMPANY_PROJECTS,
            id: id
        });
    },
    createProject: (name, slug, currency, language, company) => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.ADD_PROJECT,
            data: {name, slug, currency, language, company}
        });
    },
    updateProject: (id, data) => {
        AppDispatcher.dispatch({
            actionType: ProjectConstants.UPDATE_PROJECT,
            data: {id, data}
        });
    }
}