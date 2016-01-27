import React from 'react';
import { Link } from 'react-router';

class Register extends React.Component {

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
                            <input type="text" className="md-input" ng-model="user.name" required/>
                            <label>Name</label>
                        </div>

                        <div className="md-form-group">
                            <input type="email" className="md-input" ng-model="user.email" required/>
                            <label>Email</label>
                        </div>

                        <div className="md-form-group">
                            <input type="password" className="md-input" ng-model="user.password" required/>
                            <label>Password</label>
                        </div>

                        <div className="m-b-md">
                            <label className="md-check">
                                <input type="checkbox" ng-model="agree" required/><i className="indigo"></i>
                                Agree the <a href>terms and policy</a>
                            </label>
                        </div>
                        <button md-ink-ripple type="submit"
                                className="md-btn md-raised pink btn-block p-h-md">Sign up
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

export default Register
