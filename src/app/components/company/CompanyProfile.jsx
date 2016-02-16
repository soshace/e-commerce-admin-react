import React from 'react';
import classnames from 'classnames';
import {CompanyStore} from './../../stores';
import {CompanyActions} from './../../actions';


class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: this.props.company
        };

        this._onNameChange = this._onNameChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        var companyId,
            company;
        companyId = newProps.params.companyId;
        company = CompanyStore.getCompanyById(companyId);

        this.setState({company: company});
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
        var companyId = this.props.params.companyId;
        e.preventDefault();
        CompanyActions.updateCompany(companyId, this.state.company);
    }
}

export default CompanyProfile
