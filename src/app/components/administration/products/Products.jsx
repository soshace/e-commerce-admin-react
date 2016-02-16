import React from 'react';
import { childrenWithProps } from './../../../utils/utils.js';


class Products extends React.Component {
    render() {
        var { project } = this.props,
            children;

        if (project) {
            children = childrenWithProps(this, { project });
        }
        return (
            <div className="panel panel-default">
                {children}
            </div>
        )
    }

}

export default Products
