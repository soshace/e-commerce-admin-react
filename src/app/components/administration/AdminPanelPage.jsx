import React from 'react';
import classnames from 'classnames';
import Aside from './Aside.jsx';
import API from './../../constants/ProjectConstants.js';
import ProjectStore from './../../stores/ProjectStore.js';
import ProjectActions from './../../actions/ProjectActions.js';


class AdminPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        };
    }

    componentDidMount() {
        ProjectActions.getProfile();

        ProjectStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        ProjectStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <div>
                <Aside profile={this.state.profile}/>

                <div id="content" className="app-content" role="main">
                    <div className="box">


                        <div className="box-row">
                            <div className="box-cell">
                                <div className="box-inner padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            {this.props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    _onChange() {
        var projects = ProjectStore.projects,
            profile = ProjectStore.profile;
        this.setState({profile: profile});

        if (profile) {
            if (projects) {
                if (projects.length) {
                    //    Go to existing project
                } else {
                    //this.context.router.push('companyname/new-project');
                }
            } else {
                ProjectActions.getProjects();
            }
        }
    }


}

AdminPanelPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AdminPanelPage
