import React from 'react';
import classnames from 'classnames';
import {TeamActions} from './../../actions';
import {TeamStore} from './../../stores';
import TeamMembers from './TeamMembers.jsx';
import TeamPermissions from './TeamPermissions.jsx';
import TeamSettings from './TeamSettings.jsx';
import _ from 'underscore';


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
                                    <div className="col-sm-4">
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
                                        <a href data-toggle="tab" data-target={`#tab-${team.id}-members`}>Members</a>
                                    </li>
                                    <li>
                                        <a href data-toggle="tab" data-target={`#tab-${team.id}-permissions`}>Permissions</a>
                                    </li>
                                    <li>
                                        <a href data-toggle="tab" data-target={`#tab-${team.id}-settings`}>Settings</a>
                                    </li>
                                </ul>
                                <div className="tab-content p m-b-md b-t b-t-2x">
                                    <div role="tabpanel" className="tab-pane animated fadeIn active" id={`tab-${team.id}-members`}>
                                        <TeamMembers team={team}/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn" id={`tab-${team.id}-permissions`}>
                                        <TeamPermissions team={team}/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn" id={`tab-${team.id}-settings`}>
                                        <TeamSettings team={team} />
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

    _updateTeam(id, field, e) {
        var teams = this.state.teams,
            team = _.findWhere(teams, {id: id});

        if (e.key == 'Enter') {
            TeamActions.updateTeam(team);
        } else {
            team[field] = e.target.value;
            this.setState({teams: teams});
        }
    }
}

export default ManageTeams
