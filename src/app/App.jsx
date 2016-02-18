import React from 'react';
import classnames from 'classnames';
import { UserStore, ProjectStore, CompanyStore }  from './stores';
import { UserActions, ProjectActions, CompanyActions } from './actions';
import { childrenWithProps } from './utils/utils.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            requiredAuth: this.props.children && this.props.children.props.route.meta.requireAuth
        };

        this._onUserGet = this._onUserGet.bind(this);
        this._onPropertyGet = this._onPropertyGet.bind(this);
    }

    componentDidMount() {
        this._initWaves();

        ProjectStore.addChangeListener(this._onPropertyGet);
        CompanyStore.addChangeListener(this._onPropertyGet);
        UserStore.addChangeListener(this._onUserGet);

        if (this.state.requiredAuth) {
            UserActions.getUser();
        }
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onPropertyGet);
        CompanyStore.removeChangeListener(this._onPropertyGet);
        UserStore.removeChangeListener(this._onUserGet);
    }

    render() {
        var { user, companies, projects, requiredAuth } = this.state,
            children;

        //if (user || !requiredAuth) {
            children = childrenWithProps(this, {user, companies, projects});
        //}
        return <div>{children}</div>
    }

    _initWaves() {
        Waves.attach('.btn, .md-btn');
        Waves.attach('[data-md-ink-ripple]');
        Waves.init();
    }

    _onUserGet() {
        var user = UserStore.user;

        if (user.email) {
            CompanyActions.getCompanies();
            ProjectActions.getProjects();
        } else {
            this.context.router.push('/signin');
        }
    }

    _onPropertyGet() {
        var projects = ProjectStore.projects,
            companies = CompanyStore.companies,
            user = UserStore.user;

        if (projects && companies) {
            this.setState({user, companies, projects});
        }
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App
