import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import Validators from './../../constants/Validators.js';
import strategy from 'joi-validation-strategy';
import validation from 'react-validation-mixin';
import classnames from 'classnames';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {CompanyStore, UserStore, ProjectStore} from './../../stores';
import {CompanyActions, UserActions, ProjectActions} from './../../actions';


class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            errors: {},
            projects: [],
            companies: []
        };

        this.validatorTypes = {
            email: Validators.EMAIL,
            password: Validators.PASSWORD
        };

        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.getInputClasses = this.getInputClasses.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onLoginSuccess = this._onLoginSuccess.bind(this);
        this._onLoginFail = this._onLoginFail.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onCompaniesGet = this._onCompaniesGet.bind(this);
    }

    getValidatorData() {
        return {
            email: this.state.email,
            password: this.state.password
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onLoginSuccess, this._onLoginFail);
        CompanyStore.addChangeListener(this._onCompaniesGet);
        ProjectStore.addChangeListener(this._onProjectsGet);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onLoginSuccess, this._onLoginFail);
        ProjectStore.removeChangeListener(this._onProjectsGet);
        CompanyStore.removeChangeListener(this._onCompaniesGet);
    }

    login() {
        UserActions.login(this.state.email, this.state.password);
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

                    <form onSubmit={this._onSubmit}>
                        <div className={this.getClasses('email')}>
                            <input type="email"
                                   className={this.getInputClasses('email')}
                                   onChange={this._onChange('email')}
                                   onBlur={this.props.handleValidation('email')}
                                />
                            <label>Email</label>
                            <span className='help-block'>{this.renderHelpText('email')}</span>
                        </div>

                        <div className={this.getClasses('password')}>
                            <input type="password"
                                   className={this.getInputClasses('password')}
                                   onChange={this._onChange('password')}
                                   onBlur={this.props.handleValidation('password')}
                                />
                            <label>Password</label>
                            <span className='help-block'>{this.renderHelpText('password')}</span>
                        </div>

                        <button data-md-ink-ripple
                                type="submit"
                                className="md-btn md-raised pink btn-block p-h-md">
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

    getClasses(field) {
        return classnames("md-form-group float-label form-group", {
            'has-error': !this.props.isValid(field)
        });
    }

    getInputClasses(field) {
        return classnames("md-input form-control", {
            'has-value': this.state[field].length
        });
    }

    renderHelpText(field) {
        return this.state.errors[field] || this.props.getValidationMessages(field);
    }

    _onSubmit(e) {
        e.preventDefault();
        const onValidate = (error) => {
            if (error) {
                //    react on wrong  values
            } else {
                this.login();
            }
        };
        this.props.validate(onValidate);
    }

    _onChange(field) {
        return e => {
            this.setState({[field]: e.target.value, errors: {}});
        };
    }

    _onLoginSuccess() {
        CompanyActions.getCompanies();
    }

    _onCompaniesGet() {
        var companies = CompanyStore.companies;
        this.setState({companies: companies});

        ProjectActions.getProjects();
    }

    _onProjectsGet() {
        var projects = ProjectStore.projects,
            companies = this.state.companies,
            slug;

        if (projects.length) {
            slug = projects[0].slug;
            this.context.router.push(`/${slug}/dashboard`);
        } else {
            this.context.router.push(`/companies/${companies[0].id}/projects`);
        }
    }

    _onLoginFail() {
        var self = this;
        self.setState({errors: {email: 'wrong email/password'}});
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Login.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    getValidationMessages: PropTypes.func,
    handleValidation: PropTypes.func,
    clearValidations: PropTypes.func
};

export default validation(strategy)(Login);
