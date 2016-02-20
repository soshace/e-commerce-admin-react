import React from 'react';
import {Link} from 'react-router';
import {ProductStore, ProjectStore} from './../../../stores';
import {ProductActions, ProjectActions} from './../../../actions';


class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            query: '',
            projects: this.props.projects || [],
            companies: this.props.companies || [],
            user: this.props.user,
            project: this.props.project,
            page: 1,
            limit: 5
        };

        this._onProductsGet = this._onProductsGet.bind(this);
        this._onAddClick = this._onAddClick.bind(this);
        this._filterProducts = this._filterProducts.bind(this);
        this._onQueryChange = this._onQueryChange.bind(this);
    }

    componentDidMount() {
        var {project, page, limit} = this.state;
        ProductStore.addChangeListener(this._onProductsGet);
        ProductActions.getProjectProducts(project.id, {page, limit});
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductsGet);
    }

    render() {
        var { products, query, page }= this.state,
            projectKey = this.props.params.projectKey;
        return (
            <div>
                <div className="panel-heading">
                    All the products for your project.
                </div>
                <div className="panel-body b-b b-light">
                    <form role="form" className="inline" onSubmit={this._filterProducts}>
                        Search: <input id="filter" type="text"
                                       value={query}
                                       onChange={this._onQueryChange}
                                       className="form-control input-sm w-auto inline m-r"/>
                    </form>
                    <button className="btn btn-icon btn-default" onClick={this._onAddClick}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(function (product) {
                            return (
                                <tr key={product.id}>
                                    <td><Link to={`/${projectKey}/products/${product.id}`}>{product.name}</Link></td>
                                    <td>{product.description}</td>
                                </tr>
                            )
                        })}

                        </tbody>
                        <tfoot className="">
                        <tr>
                            <td colSpan="5" className="text-center">
                                <ul className="pagination">
                                    <li onClick={this._loadPage.bind(this, 'left')}
                                        className="footable-page-arrow">
                                        <a href="#">‹</a>
                                    </li>
                                    <li className="footable-page disabled"><a href="#">{page}</a></li>
                                    <li onClick={this._loadPage.bind(this, 'right')}
                                        className="footable-page-arrow">
                                        <a href="#">›</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }
//  <li className="footable-page-arrow disabled"><a data-page="first" href="#first">«</a></li>
//  <li className="footable-page-arrow disabled"><a data-page="prev" href="#prev">‹</a></li>
//  <li className="footable-page active"><a data-page="0" href="#">1</a></li>
//  <li className="footable-page"><a data-page="1" href="#">2</a></li>
//  <li className="footable-page-arrow"><a data-page="next" href="#next">›</a></li>
//  <li className="footable-page-arrow"><a data-page="last" href="#last">»</a></li>

    _loadPage(dir, e) {
        var { project, page, limit }= this.state;
        switch (dir) {
            case 'left':
                page--;
                break;
            case 'right':
                page++;
                break;
        }
        this.setState({page: page});
        ProductActions.getProjectProducts(project.id, {page, limit});
        e.preventDefault();
    }

    _onAddClick() {
        var projectKey = this.props.params.projectKey;
        this.context.router.push(`/${projectKey}/products/add`);
    }

    _onProductsGet() {
        var products = ProductStore.selectedProducts;
        this.setState({products: products});
    }

    _onQueryChange(e) {
        this.setState({query: e.target.value});
    }

    _filterProducts(e) {
        var { products } = this.state;
        e.preventDefault();
    }
}

ProductList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ProductList
