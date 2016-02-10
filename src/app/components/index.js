import _Account from './account/Account.jsx';
import _AccountSettings from './account/AccountSettings.jsx';
import _AccountCompanies from './account/AccountCompanies.jsx';

import _Developers from './administration/developers/Developers.jsx';
import _ProductTypes from './administration/developers/ProductTypes.jsx';
import _ProductTypeList from './administration/developers/ProductTypeList.jsx';
import _ProductTypeAdd from './administration/developers/ProductTypeAdd.jsx';
import _ProductTypeDetail from './administration/developers/ProductTypeDetail.jsx';

import _NewProduct from './administration/products/NewProduct.jsx';
import _ProductList from './administration/products/ProductList.jsx';
import _ProductDetail from './administration/products/ProductDetail.jsx';
import _Products from './administration/products/Products.jsx';

import _NewCategory from './administration/categories/NewCategory.jsx';
import _CategoryList from './administration/categories/CategoryList.jsx';
import _Categories from './administration/categories/Categories.jsx';
import _CategoryDetail from './administration/categories/CategoryDetail.jsx';

import _NotFound  from './NotFound.jsx';

import _Login from './auth/Login.jsx';
import _Register from './auth/Register.jsx';

import _Dashboard  from './administration/Dashboard.jsx';
import _AdminPanelPage  from './administration/AdminPanelPage.jsx';

import _ManageProjects from './company/ManageProjects.jsx';
import _ManageTeams from './company/ManageTeams.jsx';
import _CompanyProfile from './company/CompanyProfile.jsx';
import _Company from './company/Company.jsx';
import _NewCompany from './company/NewCompany.jsx';

import _Navbar from './Navbar.jsx';

export default {
    Account: _Account,
    AccountSettings: _AccountSettings,
    AccountCompanies: _AccountCompanies,

    Developers: _Developers,
    ProductTypes: _ProductTypes,
    ProductTypeList: _ProductTypeList,
    ProductTypeAdd: _ProductTypeAdd,
    ProductTypeDetail: _ProductTypeDetail,

    NewProduct: _NewProduct,
    ProductList: _ProductList,
    ProductDetail: _ProductDetail,
    Products: _Products,

    NewCategory: _NewCategory,
    CategoryList: _CategoryList,
    Categories: _Categories,
    CategoryDetail: _CategoryDetail,

    NotFound: _NotFound,

    Login: _Login,
    Register: _Register,

    Dashboard: _Dashboard,
    AdminPanelPage: _AdminPanelPage,

    ManageProjects: _ManageProjects,
    ManageTeams: _ManageTeams,
    CompanyProfile: _CompanyProfile,
    Company: _Company,
    NewCompany: _NewCompany,

    Navbar: _Navbar
}