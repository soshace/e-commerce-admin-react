import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import UserStore from './../../stores/UserStore.js';
import UserActions from './../../actions/UserActions.js';


class AccountSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

        this._onUserGet = this._onUserGet.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onUserGet);
        UserActions.getUser();
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserGet);
    }

    render() {
        var user = this.state.user;
        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                <form role="form" className="form-horizontal p-md col-md-6" onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                defaultValue={user.name}
                                value={user.name}
                                onChange={this._onChange('name')}
                                className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                value={user.email}
                                className="form-control"
                                disabled />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Save</button>
                </form>
            </div>
        )
    }

    _onUserGet() {
        var user = ProjectStore.user;
        this.setState({user: user});
    }

    _onChange(field) {
        var self = this;
        return (e) => {
            var user = this.state.user;
            user[field] = e.target.value;
            self.setState({user: user});
        }
    }

    _onSubmit() {

    }
}

export default AccountSettings
