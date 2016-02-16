import React from 'react';
import classnames from 'classnames';
import {TeamActions} from './../../actions';
import {TeamStore} from './../../stores';
import TeamItem from './TeamItem.jsx';
import ResponseCodes from './../../constants/ResponseCodes.js';
import _ from 'underscore';


class TeamList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: this.props.company,
            teams: [],
            newTeam: {}
        };

        this._onTeamsChange = this._onTeamsChange.bind(this);
        this._createTeam = this._createTeam.bind(this);
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
        var { teams, newTeam } = this.state;
        return (
            <div className="panel-body">
                {teams.map(function (team) {
                    return (
                        <TeamItem key={team.id} team={team} />
                    )
                })}

                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        <h1>Create a new team</h1>
                    </div>
                    <div className="panel-body">
                        <form className="form-horizontal p-h-xsform-horizontal p-h-xs"
                              onSubmit={this._createTeam}>
                            <div className="form-group form-grouplg">
                                <label className="col-sm-2 control-label">Name</label>

                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTeam.name}
                                        onChange={this._onNewTeamChange.bind(this, 'name')}
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
        this.setState({teams: TeamStore.teams, newTeam: {}});
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

export default TeamList
