import React from 'react';
import ProductStore from './../../../stores/ProductStore.js';
import ProductActions from './../../../actions/ProductActions.js';


class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: products
        };

        this._onProductsGet = this._onProductsGet.bind(this);
    }

    componentDidMount() {
        ProductStore.addChangeListener(this._onProductsGet);
        ProductActions.getProducts();
    }

    componentWillUnmount() {
        ProductStore.removeChangeListener(this._onProductsGet);
    }

    render() {
        var products = this.state.products;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Footable - make HTML tables on smaller devices look awesome
                </div>
                <div className="panel-body b-b b-light">
                    Search: <input id="filter" type="text" className="form-control input-sm w-auto inline m-r"/>
                </div>
                <div>
                    <table className="table m-b-none" ui-jp="footable" data-filter="#filter" data-page-size="5">
                        <thead>
                        <tr>
                            <th data-toggle="true">
                                Product Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th data-hide="phone,tablet">
                                Job Title
                            </th>
                            <th data-hide="phone,tablet" data-name="Date Of Birth">
                                DOB
                            </th>
                            <th data-hide="phone">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Isidra</td>
                            <td><a href>Boudreaux</a></td>
                            <td>Traffic Court Referee</td>
                            <td data-value="78025368997">22 Jun 1972</td>
                            <td data-value="1"><span className="label bg-success" title="Active">Active</span></td>
                        </tr>
                        <tr>
                            <td>Shona</td>
                            <td>Woldt</td>
                            <td><a href>Airline Transport Pilot</a></td>
                            <td data-value="370961043292">3 Oct 1981</td>
                            <td data-value="2"><span className="label bg-light" title="Disabled">Disabled</span></td>
                        </tr>
                        <tr>
                            <td>Granville</td>
                            <td>Leonardo</td>
                            <td>Business Services Sales Representative</td>
                            <td data-value="-22133780420">19 Apr 1969</td>
                            <td data-value="3"><span className="label bg-warning" title="Suspended">Suspended</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Easer</td>
                            <td>Dragoo</td>
                            <td>Drywall Stripper</td>
                            <td data-value="250833505574">13 Dec 1977</td>
                            <td data-value="1"><span className="label bg-success" title="Active">Active</span></td>
                        </tr>
                        <tr>
                            <td>Maple</td>
                            <td>Halladay</td>
                            <td>Aviation Tactical Readiness Officer</td>
                            <td data-value="694116650726">30 Dec 1991</td>
                            <td data-value="3"><span className="label bg-warning" title="Suspended">Suspended</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Maxine</td>
                            <td><a href>Woldt</a></td>
                            <td><a href>Business Services Sales Representative</a></td>
                            <td data-value="561440464855">17 Oct 1987</td>
                            <td data-value="2"><span className="label bg-light" title="Disabled">Disabled</span></td>
                        </tr>
                        <tr>
                            <td>Lorraine</td>
                            <td>Mcgaughy</td>
                            <td>Hemodialysis Technician</td>
                            <td data-value="437400551390">11 Nov 1983</td>
                            <td data-value="2"><span className="label bg-light" title="Disabled">Disabled</span></td>
                        </tr>
                        <tr>
                            <td>Lizzee</td>
                            <td><a href>Goodlow</a></td>
                            <td>Technical Services Librarian</td>
                            <td data-value="-257733999319">1 Nov 1961</td>
                            <td data-value="3"><span className="label bg-warning" title="Suspended">Suspended</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Judi</td>
                            <td>Badgett</td>
                            <td>Electrical Lineworker</td>
                            <td data-value="362134712000">23 Jun 1981</td>
                            <td data-value="1"><span className="label bg-success" title="Active">Active</span></td>
                        </tr>
                        <tr>
                            <td>Lauri</td>
                            <td>Hyland</td>
                            <td>Blackjack Supervisor</td>
                            <td data-value="500874333932">15 Nov 1985</td>
                            <td data-value="3"><span className="label bg-warning" title="Suspended">Suspended</span>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot className="hide-if-no-paging">
                        <tr>
                            <td colSpan="5" className="text-center">
                                <ul className="pagination"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

    _onProductsGet() {
        var products = ProductStore.products;
        this.setState({products: products});

    }
}

export default Products
