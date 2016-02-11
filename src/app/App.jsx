import React from 'react';
import classnames from 'classnames';
import { UserStore, ProjectStore, CompanyStore }  from './stores';
import { UserActions } from './actions';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
        ;

        this._onUserGet = this._onUserGet.bind(this);
    }

    componentDidMount() {
        this._initWaves();

        UserStore.addChangeListener(this._onUserGet);

        UserActions.getUser();
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserGet);
    }

    componentWillReceiveProps() {
        this.setState({user: UserStore.user});
    }

    render() {
        var user = this.state.user,
            childrenWithProps,
            requiredAuth = this.props.children.props.route.meta.requireAuth;

        if (user || !requiredAuth) {
            childrenWithProps = React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { user: user });
            });
        }
        return <div>{childrenWithProps}</div>
    }

    _initWaves() {
        Waves.attach('.btn, .md-btn');
        Waves.attach('[data-md-ink-ripple]');
        Waves.init();
    }

    _onUserGet() {
        var user = UserStore.user;

        if (user.email) {
            this.setState({user: user});
        } else {
            this.context.router.push('/signin');
        }

    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App
