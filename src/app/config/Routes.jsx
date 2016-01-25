import React from 'react';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router';
import App  from './../App.jsx';
import NotFound  from './../components/NotFound.jsx';
import Login  from './../components/Login.jsx';
import Project  from './../components/Project.jsx';
import Products  from './../components/administration/Products.jsx';
import Dashboard  from './../components/administration/Dashboard.jsx';

var Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path=":projectName" component={Project}>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="products" component={Products}/>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes