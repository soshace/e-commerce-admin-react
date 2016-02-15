import React from 'react';
import classnames from 'classnames';
import {TeamActions} from './../../actions';
import {TeamStore} from './../../stores';
import TeamMembers from './TeamMembers.jsx';


class ManageTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: this.props.company,
            teams: []
        };

        this._onTeamsGet = this._onTeamsGet.bind(this);
    }

    componentDidMount() {
        var company = this.props.company;
        if (company.id) {
            TeamActions.getCompanyTeams(company.id);
        }
        TeamStore.addChangeListener(this._onTeamsGet);
    }

    componentWillUnmount() {
        TeamStore.removeChangeListener(this._onTeamsGet);
    }

    componentWillReceiveProps(newProps) {
        var company = newProps.company;
        this.setState({company: company});
        TeamActions.getCompanyTeams(company.id);
    }

    render() {
        var { company, teams } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {teams.map(function (team) {
                    return (
                        <div key={team.id} className="panel panel-default">
                            <div className="panel-heading bg-white">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="input-group m-b">
                                            <span className="input-group-addon">Name</span>
                                            <input type="text"
                                                   className="form-control"
                                                   value={team.name}
                                                   onChange={self._updateTeam.bind(self, team.id, 'name')}
                                                   onKeyPress={self._updateTeam.bind(self, team.id, 'name')}
                                                   placeholder="Name"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <ul className="nav nav-md nav-tabs nav-lines b-info">
                                    <li className="active">
                                        <a href data-toggle="tab" data-target="#tab_1">Members</a>
                                    </li>
                                    <li>
                                        <a href data-toggle="tab" data-target="#tab_2">Permission</a>
                                    </li>
                                    <li>
                                        <a href data-toggle="tab" data-target="#tab_3">Settings</a>
                                    </li>
                                </ul>
                                <div className="tab-content p m-b-md b-t b-t-2x">
                                    <div role="tabpanel" className="tab-pane animated fadeIn active" id="tab_1">
                                        <TeamMembers team={team}/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_2">
                                        {/*<TeamPermissions team={team} />*/}
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn" id="tab_3">

                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                })}
            </div>
        )
    }

    _onTeamsGet() {
        this.setState({teams: TeamStore.teams});
    }

    _updateTeam() {

    }
}

export default ManageTeams
