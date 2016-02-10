import React from 'react';
import ProductTypes from './ProductTypes.jsx';


class Developers extends React.Component {
    render() {
        var projectKey = this.props.params.projectKey;
        return (
            <div className="panel panel-default">
                <ul className="nav nav-md nav-tabs nav-lines b-info">
                    <li className="active">
                        <a href data-toggle="tab" data-target="#tab_1">ProductTypes</a>
                    </li>
                    <li>
                        <a href data-toggle="tab" data-target="#tab_2">Danger Zone</a>
                    </li>
                </ul>
                <div className="tab-content p m-b-md b-t b-t-2x">
                    <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                        <ProductTypes projectKey={projectKey} />
                    </div>
                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">

                    </div>
                </div>
            </div>
        )
    }
}

export default Developers
