import React from 'react';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading bg-white">
                    <span className="label pull-right m-t-xs amber">4 left</span>
                    <span className="h4">Tasks</span>
                </div>
                <table className="table m-b-none">
                    <thead>
                    <tr>
                        <th>Progress</th>
                        <th>Item</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div
                                className="progress progress-xs progress-striped active no-margin m-v-sm">
                                <div className="progress-bar bg-success"
                                     data-toggle="tooltip"
                                     data-original-title="80%"
                                     style={{width: "80%"}}></div>
                            </div>
                        </td>
                        <td>App prototype design</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="progress progress-xs no-margin m-v-sm">
                                <div className="progress-bar bg-info"
                                     data-toggle="tooltip"
                                     data-original-title="40%"
                                     style={{width: "40%"}}></div>
                            </div>
                        </td>
                        <td>Design documents</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="progress progress-xs no-margin m-v-sm">
                                <div className="progress-bar bg-warning"
                                     data-toggle="tooltip"
                                     data-original-title="20%"
                                     style={{width: "20%"}}></div>
                            </div>
                        </td>
                        <td>UI toolkit</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="progress progress-xs no-margin m-v-sm">
                                <div className="progress-bar bg-danger"
                                     data-toggle="tooltip"
                                     data-original-title="15%"
                                     style={{width: "15%"}}></div>
                            </div>
                        </td>
                        <td>Testing</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dashboard
