import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import classnames from 'classnames';
import {UserStore} from './../../stores';
import {UserActions} from './../../actions';


class Logout extends Component {
    constructor(props) {
        super(props);

        this._onLogoutSuccess = this._onLogoutSuccess.bind(this);
    }

    componentDidMount() {
        UserStore.addLogoutListener(this._onLogoutSuccess);
        UserActions.logout()
    }

    componentWillUnmount() {
        UserStore.removeLogoutListener(this._onLogoutSuccess);
    }

    render() {
        return (
           <div>Logout preloader</div>
        )
    }

    _onLogoutSuccess() {
        var user = UserStore.user;
        if (!user.email) {
            this.context.router.push('/signin');
        }
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Logout;
