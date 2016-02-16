import React from 'react';

export function childrenWithProps(context, props) {
    return React.Children.map(context.props.children, (child) => {
        return React.cloneElement(child, props);
    })
}