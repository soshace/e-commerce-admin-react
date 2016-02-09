import React from 'react';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect  } from 'react-router';
import App  from './../App.jsx';
import UserStore from './../stores/UserStore.js';
import NotFound  from './../components/NotFound.jsx';
import Login from './../components/auth/Login.jsx';
import Register from './../components/auth/Register.jsx';
import Dashboard  from './../components/administration/Dashboard.jsx';
import AdminPanelPage  from './../components/administration/AdminPanelPage.jsx';
import ManageProjects from './../components/company/ManageProjects.jsx';
import ManageTeams from './../components/company/ManageTeams.jsx';
import CompanyProfile from './../components/company/CompanyProfile.jsx';
import Company from './../components/company/Company.jsx';
import NewCompany from './../components/company/NewCompany.jsx';
import { Account, AccountSettings, AccountCompanies } from './../components';

import NewProduct from './../components/administration/products/NewProduct.jsx';
import ProductList from './../components/administration/products/ProductList.jsx';
import ProductDetail from './../components/administration/products/ProductDetail.jsx';
import Products from './../components/administration/products/Products.jsx';

import NewCategory from './../components/administration/categories/NewCategory.jsx';
import CategoryList from './../components/administration/categories/CategoryList.jsx';
import Categories from './../components/administration/categories/Categories.jsx';
import CategoryDetail from './../components/administration/categories/CategoryDetail.jsx';


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
                    <Route path="add" component={NewProduct}/>
                    <Route path=":productId" component={ProductDetail} />
                </Route>
                <Route path="categories" component={Categories}>
                    <IndexRedirect to="list"/>
                    <Route path="list" component={CategoryList}/>
                    <Route path="add" component={NewCategory}/>
                    <Route path=":categoryId" component={CategoryDetail} />
                </Route>
            </Route>

            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default Routes