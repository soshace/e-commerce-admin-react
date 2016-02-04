import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import ProjectStore from './../../stores/ProjectStore.js';
import ProjectActions from './../../actions/ProjectActions.js';


class AccountSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        };

        this._onProfileGet = this._onProfileGet.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        ProjectStore.addChangeListener(this._onProfileGet);
        var profile = ProjectStore.profile;
        if (profile) {
            this._onProfileGet();
        } else {
            ProjectActions.getProfile();
        }
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onProfileGet);
    }

    render() {
        var profile = this.state.profile;
        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                <form role="form" className="form-horizontal p-md col-md-6" onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                defaultValue={profile.name}
                                value={profile.name}
                                onChange={this._onChange('name')}
                                className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                value={profile.email}
                                className="form-control"
                                disabled />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Save</button>
                </form>
            </div>
        )
    }

    _onProfileGet() {
        var profile = ProjectStore.profile;
        this.setState({profile: profile});
    }

    _onChange(field) {
        var self = this;
        return (e) => {
            var profile = this.state.profile;
            profile[field] = e.target.value;
            self.setState({profile: profile});
        }
    }

    _onSubmit() {

    }
}

export default AccountSettings
