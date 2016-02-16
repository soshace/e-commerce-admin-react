import React from 'react';
import classnames from 'classnames';
import {TeamActions} from './../../actions';
import {TeamStore} from './../../stores';
import TeamMembers from './TeamMembers.jsx';
import TeamPermissions from './TeamPermissions.jsx';
import TeamSettings from './TeamSettings.jsx';
import ResponseCodes from './../../constants/ResponseCodes.js';
import _ from 'underscore';


class ManageTeams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: this.props.company,
            teams: [],
            newTeam: {},
            inviteEmail: null,
            invited: null,
            alertMessage: null
        };

        this._onTeamsChange = this._onTeamsChange.bind(this);
        this._createTeam = this._createTeam.bind(this);
        this._inviteToTeam = this._inviteToTeam.bind(this);
        this._onInvitedChange = this._onInvitedChange.bind(this);
    }

    componentDidMount() {
        var company = this.props.company;
        if (company.id) {
            TeamActions.getCompanyTeams(company.id);
        }
        TeamStore.addChangeListener(this._onTeamsChange);
    }

    componentWillUnmount() {
        TeamStore.removeChangeListener(this._onTeamsChange);
    }

    componentWillReceiveProps(newProps) {
        var company = newProps.company;
        this.setState({company: company});
        TeamActions.getCompanyTeams(company.id);
    }

    render() {
        var { company, teams, inviteEmail, alertMessage, newTeam } = this.state,
            self = this;
        return (
            <div className="panel-body">
                {teams.map(function (team) {
                    var alertClass = classnames('alert alert-success', {hide: !alertMessage});
                    return (
                        <div key={team.id} className="panel panel-default">

                            <div className="modal fade" id={`modal-${team.id}`} tabIndex="-1" role="dialog"
                                 aria-labelledby="myModalLabel">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h4 className="modal-title" id="myModalLabel">Invite someone
                                                to {team.name}</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className={alertClass}>{alertMessage}</div>
                                            <div className="input-group">
                                                <input type="text"
                                                       value={inviteEmail}
                                                       onChange={self._onInvitedChange}
                                                       className="form-control"/>
                                                <span className="input-group-btn">
                                                <button className="btn btn-default waves-effect"
                                                        onClick={self._inviteToTeam.bind(self, team.id)}
                                                        type="button">Invite
                                                </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                                    <div className="col-sm-2 col-sm-offset-6">
                                        <button data-md-ink-ripple type="button"
                                                className="md-btn md-raised m-b btn-fw bg-white"
                                                data-toggle="modal"
                                                data-target={`#modal-${team.id}`}>
                                            Invite someone
                                        </button>
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
                                    <div role="tabpanel" className="tab-pane animated fadeIn active"
                                         id={`tab-${team.id}-members`}>
                                        <TeamMembers team={team}/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn"
                                         id={`tab-${team.id}-permissions`}>
                                        <TeamPermissions team={team}/>
                                    </div>
                                    <div role="tabpanel" className="tab-pane animated fadeIn"
                                         id={`tab-${team.id}-settings`}>
                                        <TeamSettings team={team}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        <h1>Create a new team</h1>
                    </div>
                    <div className="panel-body">
                        <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                              onSubmit={self._createTeam}>
                            <div className="form-group form-grouplg">
                                <label className="col-sm-2 control-label">Name</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTeam.name}
                                        onChange={self._onNewTeamChange.bind(self, 'name')}
                                        placeholder="Team name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group m-t">
                                <div className="col-sm-4 col-sm-offset-2">
                                    <button type="submit"
                                            className="btn btn-primary waves-effect"
                                    >Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    _onTeamsChange() {
        var inviteResCode = TeamStore.inviteResCode,
            alertMessage = null,
            invited = this.state.inviteEmail;

        switch (inviteResCode) {
            case ResponseCodes.INVITE_SENT:
                alertMessage = `Invitation was sent to ${invited}`;
                break;
            case ResponseCodes.USER_ADDED_TO_TEAM:
                alertMessage = `User ${invited} added to the team`;
                break;
        }

        this.setState({teams: TeamStore.teams, alertMessage: alertMessage, inviteEmail: null, newTeam: {}});
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

    _onInvitedChange(e) {
        this.setState({inviteEmail: e.target.value});
    }

    _inviteToTeam(teamId) {
        var invite = {
            email: this.state.inviteEmail,
            team: teamId
        };
        if (invite.email) {
            TeamActions.sendInvite(invite);
        }
    }

    _onNewTeamChange(field, e) {
        var newTeam = this.state.newTeam;
        newTeam[field] = e.target.value;
        this.setState({newTeam: newTeam});
    }

    _createTeam(e) {
        e.preventDefault();
        var { newTeam, company } = this.state,
            team = {
                name: newTeam.name,
                company: company.id
            };
        TeamActions.createTeam(team);
    }
}

export default ManageTeams
