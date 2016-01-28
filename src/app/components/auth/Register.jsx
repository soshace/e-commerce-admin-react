import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import ReactMixin from 'react-mixin';
import AuthActions from './../../actions/AuthActions.js';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    register(e) {
        e.preventDefault();
        AuthActions.register(this.state.email, this.state.password, this.state.name);
    }

    render() {
        return (
            <div className="center-block w-xxl w-auto-xs p-v-md">
                <div className="navbar">
                    <div className="navbar-brand m-t-lg text-center">
                        <span className="m-l inline">Freeway</span>
                    </div>
                </div>

                <div className="p-lg panel md-whiteframe-z1 text-color m">
                    <div className="m-b text-sm">
                        Sign up to your Freeway Account
                    </div>
                    <form name="form">
                        <div className="md-form-group">
                            <input type="text" className="md-input" valueLink={this.linkState('name')} required/>
                            <label>Name</label>
                        </div>

                        <div className="md-form-group">
                            <input type="email" className="md-input" valueLink={this.linkState('email')} required/>
                            <label>Email</label>
                        </div>

                        <div className="md-form-group">
                            <input type="password" className="md-input" valueLink={this.linkState('password')} required/>
                            <label>Password</label>
                        </div>

                        <button data-md-ink-ripple
                                type="submit"
                                onClick={this.register.bind(this)}
                                className="md-btn md-raised pink btn-block p-h-md">
                            Sign up
                        </button>
                    </form>
                </div>

                <div className="p-v-lg text-center">
                    <Link to="/signin" data-md-ink-ripple="" className="md-btn">Sign in</Link>
                </div>
            </div>
        )
    }
}

ReactMixin(Register.prototype, LinkedStateMixin);

export default Register
