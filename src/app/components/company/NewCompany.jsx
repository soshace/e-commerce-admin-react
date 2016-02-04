import React from 'react';
import classnames from 'classnames';
import CompanyMenu from './CompanyMenu.jsx';
import CompanyActions from './../../actions/CompanyActions.js';
import CompanyStore from './../../stores/CompanyStore.js';
import Navbar from './../Navbar.jsx';


class NewCompany extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            created: false
        };

        this._onCompanyCreate = this._onCompanyCreate.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        CompanyStore.addChangeListener(this._onCompanyCreate);
        CompanyActions.getCompanies();
    }

    componentWillUnmount() {
        CompanyStore.removeChangeListener(this._onCompanyCreate);
    }


    render() {
        return (
            <div>
                <Navbar/>

                <div className="app-content">
                    <div className="box">
                        <div className="box-cell">
                            <div className="box-inner padding col-md-6 col-md-offset-3">
                                <div className="panel panel-default">
                                    <div className="panel-heading bg-white">
                                        New Company<br/>
                                        <small className="text-muted">In order to use freeway you will need to be
                                            part of an organization.
                                            You can create one or ask to be added to an existing one.
                                        </small>
                                    </div>

                                    <div className="panel-body">
                                        <form role="form" className="form-horizontal p-md col-md-12"
                                              onSubmit={this._onSubmit}>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Name</label>

                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        onChange={this._onNameChange}
                                                        className="form-control"/>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-info m-t">Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onNameChange(e) {
        var value = e.target.value;
        this.setState({name: value});
    }

    _onSubmit(e) {
        var name = this.state.name;
        this.setState({created: true});
        e.preventDefault();
        CompanyActions.createCompany({name});
    }

    _onCompanyCreate() {
        var company = CompanyStore.getLastCompany(),
            created = this.state.created;
        if (created) {
            this.context.router.push(`companies/${company.id}/projects`);
        }
    }
}

NewCompany.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NewCompany
