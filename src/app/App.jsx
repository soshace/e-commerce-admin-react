import React from 'react';
import classnames from 'classnames';

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
