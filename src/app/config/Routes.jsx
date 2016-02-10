import React from 'react';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect  } from 'react-router';
import App  from './../App.jsx';
import { UserStore } from './../stores';

import {
    Account, AccountSettings, AccountCompanies,
    ProductAdd, ProductList, ProductDetail, Products,
    NewCategory, CategoryList, Categories, CategoryDetail,
    Developers, ProductTypes, ProductTypeList, ProductTypeAdd, ProductTypeDetail,
    NotFound,
    Login, Register,
    Dashboard, AdminPanelPage,
    ManageProjects, ManageTeams, CompanyProfile, Company, NewCompany
} from './../components';


function requireAuth(nextState, replace) {
    if (!UserStore.loggedIn()) {
        replace({
            pathname: '/signin',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

var Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="signin"/>
            <Route path="signin" component={Login}/>
            <Route path="signup" component={Register}/>
            <Route path="account" component={Account} onEnter={requireAuth}>
                <IndexRedirect to="profile"/>
                <Route path="profile" component={AccountSettings}/>
                <Route path="companies" component={AccountCompanies}/>
            </Route>
            <Route path="companies/new" component={NewCompany} onEnter={requireAuth}/>
            <Route path="companies/:id" component={Company} onEnter={requireAuth}>
                <IndexRedirect to="profile"/>
                <Route path="projects" component={ManageProjects}/>
                <Route path="teams" component={ManageTeams}/>
                <Route path="profile" component={CompanyProfile}/>
            </Route>
            <Route path=":projectKey" component={AdminPanelPage} onEnter={requireAuth}>
                <IndexRedirect to="dashboard"/>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="products" component={Products}>
                    <IndexRedirect to="list"/>
                    <Route path="list" component={ProductList}/>
                    <Route path="add" component={ProductAdd}/>
                    <Route path=":productId" component={ProductDetail} />
                </Route>
                <Route path="categories" component={Categories}>
                    <IndexRedirect to="list"/>
                    <Route path="list" component={CategoryList}/>
                    <Route path="add" component={NewCategory}/>
                    <Route path=":categoryId" component={CategoryDetail} />
                </Route>
                <Route path="developers" component={Developers}>
                    <IndexRedirect to="types"/>
                    <Route path="types" component={ProductTypes}>
                        <IndexRedirect to="list"/>
                        <Route path="list" component={ProductTypeList}/>
                        <Route path="add" component={ProductTypeAdd}/>
                        <Route path=":productTypeId" component={ProductTypeDetail}/>
                    </Route>

                </Route>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes