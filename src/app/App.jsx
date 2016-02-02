import React from 'react';
import classnames from 'classnames';
import AuthStore from './stores/AuthStore.js';
import Navbar from './components/Navbar.jsx';

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
                <Navbar/>
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
