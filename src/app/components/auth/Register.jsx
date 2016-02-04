import React, {Component, PropTypes} from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';
import AuthActions from './../../actions/AuthActions.js';
import UserStore from './../../stores/UserStore.js';
import ProjectStore from './../../stores/ProjectStore.js';
import ProjectActions from './../../actions/ProjectActions.js';
import Validators from './../../constants/Validators.js';
import strategy from 'joi-validation-strategy';
import validation from 'react-validation-mixin';
import classnames from 'classnames';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import CompanyStore from './../../stores/CompanyStore.js';
import CompanyActions from './../../actions/CompanyActions.js';


class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
            errors: {},
            projects: [],
            companies: []
        };

        this.validatorTypes = {
            name: Validators.NAME,
            email: Validators.EMAIL,
            password: Validators.PASSWORD
        };

        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onRegisterSuccess = this._onRegisterSuccess.bind(this);
        this._onRegisterFail = this._onRegisterFail.bind(this);
        this._onProjectsGet = this._onProjectsGet.bind(this);
        this._onCompaniesGet = this._onCompaniesGet.bind(this);
    }

    getValidatorData() {
        return {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
    }

    componentDidMount() {
        UserStore.addListener(this._onRegisterSuccess, this._onRegisterFail);
        ProjectStore.addChangeListener(this._onProjectsGet);
    }

    componentWillUnmount() {
        //UserStore.removeListener(this._onRegisterSuccess, this._onRegisterFail);
    }

    register() {
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

                    <div className="m-b text-sm">
                        <label>{this.state.errorMessage}</label>
                    </div>

                    <form name="form" onSubmit={this._onSubmit}>
                        <div className={this.getClasses('name')}>
                            <input type="text"
                                   className="md-input form-control"
                                   onChange={this._onChange('name')}
                                   onBlur={this.props.handleValidation('name')}
                                />
                            <label>Name</label>
                            <span className='help-block'>{this.renderHelpText('name')}</span>
                        </div>

                        <div className={this.getClasses('email')}>
                            <input type="email"
                                   className="md-input form-control"
                                   onChange={this._onChange('email')}
                                   onBlur={this.props.handleValidation('email')}
                                />
                            <label>Email</label>
                            <span className='help-block'>{this.renderHelpText('email')}</span>
                        </div>

                        <div className={this.getClasses('password')}>
                            <input type="password"
                                   className="md-input form-control"
                                   onChange={this._onChange('password')}
                                   onBlur={this.props.handleValidation('password')}
                                />
                            <label>Password</label>
                            <span className='help-block'>{this.renderHelpText('password')}</span>
                        </div>

                        <button data-md-ink-ripple
                                type="submit"
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

    getClasses(field) {
        return classnames("md-form-group float-label form-group", {
            'has-error': !this.props.isValid(field)
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
                this.register();
            }
        };
        this.props.validate(onValidate);
    }

    _onChange(field) {
        return e => {
            this.setState({[field]: e.target.value, errors: {}});
        };
    }

    _onRegisterSuccess() {
        var companies = CompanyStore.companies;

        if (companies) {
            this.setState({companies: companies});
            this._onCompaniesGet();
        } else {
            CompanyActions.getCompanies();
        }
    }

    _onCompaniesGet() {
        var projects = ProjectStore.projects,
            companies = CompanyStore.companies;
        this.setState({companies: companies});

        if (projects) {
            this.setState({projects: projects});
            this._onProjectsGet();
        } else {
            ProjectActions.getProjects();
        }
    }

    _onProjectsGet() {
        var projects = ProjectStore.projects,
            companies = this.state.companies,
            slug;

        if (projects.length) {
            slug = projects[0].slug;
            this.context.router.push(`${slug}/dashboard`);
        } else {
            this.context.router.push(`companies/${companies[0].id}/projects`);
        }
    }

    _onRegisterFail() {
        var self = this;
        UserStore.user.validationErrors.forEach(function (err) {
            if (err === 'email') {
                self.setState({errors: {email: 'Such email already exists'}});
            }
        });

    }
}

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Register.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    getValidationMessages: PropTypes.func,
    handleValidation: PropTypes.func,
    clearValidations: PropTypes.func
};

export default validation(strategy)(Register);
