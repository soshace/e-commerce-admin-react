import React from 'react';
import classnames from 'classnames';
import CompanyStore from './../../stores/CompanyStore.js';
import CompanyActions from './../../actions/CompanyActions.js';


class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: {
                name: ''
            }
        };

        this._onCompanyGet = this._onCompanyGet.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        CompanyStore.addChangeListener(this._onCompanyGet);
        var companies = CompanyStore.companies;
        if (companies) {
            this._onCompanyGet();
        } else {
            CompanyActions.getCompanies();
        }
    }

    componentWillUnmount() {
        CompanyStore.removeChangeListener(this._onCompanyGet);
    }

    componentWillReceiveProps(newProps) {
        this._onCompanyGet(newProps);
    }

    render() {
        var company = this.state.company;

        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                <form role="form" className="form-horizontal p-md col-md-6" onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                defaultValue={company.name}
                                value={company.name}
                                onChange={this._onNameChange}
                                className="form-control"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Submit</button>
                </form>
            </div>
        )
    }

    _onNameChange(e) {
        var value = e.target.value,
            company = this.state.company;
        company.name = value;
        this.setState({company: company});
    }

    _onSubmit(e) {
        var companyId = this.props.params.id;
        e.preventDefault();
        CompanyActions.updateCompany(companyId, this.state.company);
    }

    _onCompanyGet(newProps) {
        var companyId,
            company;
        if (newProps) {
            companyId = newProps.params.id;
        } else {
            companyId = this.props.params.id;
        }
        company = CompanyStore.getCompanyById(companyId);

        this.setState({company: company});
    }
}

export default CompanyProfile
