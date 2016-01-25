import React from 'react';
import Header from './components/partials/Header.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}

export default App
