import React from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        }
    }

    login(e) {
        e.preventDefault();
        Auth
            .login(this.state.user, this.state.password)
            .catch(function (err) {
                console.error(err);
            })
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
                        Sign in with your Freeway Account
                    </div>
                    <form name="form">
                        <div className="md-form-group float-label">
                            <input type="email" className="md-input" valueLink={this.linkState('user')} required/>
                            <label>Email</label>
                        </div>

                        <div className="md-form-group float-label">
                            <input type="password" className="md-input" valueLink={this.linkState('password')} required/>
                            <label>Password</label>
                        </div>

                        <div className="m-b-md">
                            <label className="md-check">
                                <input type="checkbox"/>
                                <i className="indigo"></i>
                                Keep me signed in
                            </label>
                        </div>
                        <button data-md-ink-ripple
                                type="submit"
                                className="md-btn md-raised pink btn-block p-h-md"
                                onClick={this.login.bind(this)}>
                            Sign in
                        </button>
                    </form>
                </div>

                <div className="p-v-lg text-center">
                    <div className="m-b">
                        <button ui-sref="access.forgot-password" className="md-btn">Forgot password?</button>
                    </div>
                    <Link to="/signup" data-md-ink-ripple="" className="md-btn">Create an account</Link>
                </div>
            </div>
        )
    }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
