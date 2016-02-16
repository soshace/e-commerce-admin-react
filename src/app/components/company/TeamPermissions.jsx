import React from 'react';
import classnames from 'classnames';
import { TeamActions } from './../../actions';
import { TeamStore, ProjectStore } from './../../stores';
import { PERMISSIONS } from './../../constants/MainPageConstants.js';


class TeamPermissions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            permissions: this.props.permissions
        };

        this._generatePermissionSelect = this._generatePermissionSelect.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({permissions: this.props.permissions});
    }

    render() {
        var { permissions } = this.state,
            self = this;
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Project</th>
                    <th>Products</th>
                    <th>Orders</th>
                    <th>Customers</th>
                </tr>
                </thead>
                <tbody>
                {permissions.map(function (perm) {
                    var project = ProjectStore.getProjectById(perm.project);
                    return (
                        <tr key={perm.id}>
                            <td>{project.name}</td>
                            <td>{self._generatePermissionSelect(perm, 'products')}</td>
                            <td>{self._generatePermissionSelect(perm, 'orders')}</td>
                            <td>{self._generatePermissionSelect(perm, 'customers')}</td>
                        </tr>
                    )
                })}

                </tbody>
                <tfoot className="">
                <tr>
                    <td colSpan="5" className="text-center">
                        <ul className="pagination"></ul>
                    </td>
                </tr>
                </tfoot>
            </table>
        )
    }

    _generatePermissionSelect(permission, permType) {
        permType += 'Permission';
        return (
            <select className="form-control"
                    value={permission[permType]}
                    onChange={this._onPermissionChange.bind(this, permission, permType)}>
                {PERMISSIONS.map(function (perm) {
                    return <option key={perm} value={perm}>{perm}</option>
                })}
            </select>
        )
    }

    _onPermissionChange(perm, permType, e) {
        var permissions = this.state.permissions;
        perm[permType] = e.target.value;
        this.setState({permissions: permissions});
        TeamActions.updatePermission(perm);
    }

}

export default TeamPermissions
