import React from 'react';
import classnames from 'classnames';
import {TeamActions} from './../../actions';
import {TeamStore} from './../../stores';
import TeamMembers from './TeamMembers.jsx';
import TeamPermissions from './TeamPermissions.jsx';
import TeamSettings from './TeamSettings.jsx';
import ResponseCodes from './../../constants/ResponseCodes.js';
import _ from 'underscore';


class TeamItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: this.props.team,
            inviteEmail: null,
            invited: null,
            alertMessage: null
        };

        this._inviteToTeam = this._inviteToTeam.bind(this);
        this._onInvitedChange = this._onInvitedChange.bind(this);
        this._onTeamChange = this._onTeamChange.bind(this);
    }

    componentDidMount() {
        TeamStore.addChangeListener(this._onTeamChange);
    }

    componentWillUnmount() {
        TeamStore.removeChangeListener(this._onTeamChange);
    }

    componentWillReceiveProps(newProps) {
        this.setState({team: newProps.team});
    }

    render() {
        var { team, inviteEmail, alertMessage } = this.state,
            alertClass = classnames('alert alert-success', {hide: !alertMessage});
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
                                           onChange={this._onInvitedChange}
                                           className="form-control"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default waves-effect"
                                        onClick={this._inviteToTeam.bind(this, team.id)}
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
                                       onChange={this._updateTeam.bind(this, team.id, 'name')}
                                       onKeyPress={this._updateTeam.bind(this, team.id, 'name')}
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
                            <TeamPermissions permissions={team.permissions}/>
                        </div>
                        <div role="tabpanel" className="tab-pane animated fadeIn"
                             id={`tab-${team.id}-settings`}>
                            <TeamSettings team={team}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onTeamChange() {
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
            default:
                alertMessage = null;
        }

        this.setState({alertMessage: alertMessage, inviteEmail: null});
    }

    _updateTeam(id, field, e) {
        var { team } = this.state;

        if (e.key == 'Enter') {
            TeamActions.updateTeam(team);
        } else {
            team[field] = e.target.value;
            this.setState({team: team});
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

}

export default TeamItem
