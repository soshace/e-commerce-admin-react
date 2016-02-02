import React from 'react';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router';
import App  from './../App.jsx';
import AuthStore from './../stores/AuthStore.js';
import NotFound  from './../components/NotFound.jsx';
import Login from './../components/auth/Login.jsx';
import Register from './../components/auth/Register.jsx';
import Products  from './../components/administration/Products.jsx';
import Dashboard  from './../components/administration/Dashboard.jsx';
import AdminPanelPage  from './../components/administration/AdminPanelPage.jsx';
import NewProject from './../components/administration/NewProject.jsx';

function requireAuth(nextState, replace) {
    if (!AuthStore.loggedIn()) {
        replace({
            pathname: '/signin',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

var Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="signin" component={Login}/>
            <Route path="signup" component={Register}/>
            <Route path="new_project" component={NewProject}/>
            <Route path=":projectName" component={AdminPanelPage} onEnter={requireAuth}>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="products" component={Products}/>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes