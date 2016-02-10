import React from 'react';


class Developers extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                {this.props.children}
            </div>
        )
    }
}

export default Developers
