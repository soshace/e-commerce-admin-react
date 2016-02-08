import React from 'react';


class Categories extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                {this.props.children}
            </div>
        )
    }

}

export default Categories
