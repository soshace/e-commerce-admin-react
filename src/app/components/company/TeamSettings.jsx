import React from 'react';
import classnames from 'classnames';
import { TeamActions } from './../../actions';


class TeamSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: this.props.team
        };

        this._removeTeam = this._removeTeam.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({team: this.props.team});
    }

    render() {
        return (
            <div>
                <h2>Delete team</h2>
                <button data-md-ink-ripple
                        className="md-btn md-raised m-b btn-fw red"
                        onClick={this._removeTeam}
                >Delete Team</button>
            </div>
        )
    }

    _removeTeam() {
        var team = this.state.team;
        TeamActions.removeTeam(team.id);
    }
}

export default TeamSettings
