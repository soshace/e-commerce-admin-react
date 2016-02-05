import React from 'react';
import classnames from 'classnames';
import UserStore from './stores/UserStore.js';
import ProjectStore from './stores/ProjectStore.js';
import CompanyStore from './stores/CompanyStore.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._initWaves();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>

        )
    }

    _initWaves() {
        Waves.attach('.btn, .md-btn');
        Waves.attach('[data-md-ink-ripple]');
        Waves.init();
    }
}

export default App
