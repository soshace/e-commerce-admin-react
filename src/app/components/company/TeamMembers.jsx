import React from 'react';
import classnames from 'classnames';
import { TeamActions } from './../../actions';


class TeamMembers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            members: this.props.team.members,
            team: this.props.team
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({members: this.props.team.members});
    }

    render() {
        var { members, team } = this.state,
            self = this;
        return (
            <div>
                {members.map(function (member) {
                    return (
                        <div key={member.id} className="inline w-xs vtop">
                            <a className="glyphicon glyphicon-remove"
                               onClick={self._removeMember.bind(self, member.id, team.id)}></a>
                            <a href="">
                                <img src={`/images/a${Math.round(Math.random() * 10)}.jpg`}
                                     className="img-circle img-responsive"/>
                            </a>
                            <span>{member.name}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    _removeMember(memberId, teamId) {
        TeamActions.removeMember(memberId, teamId);
    }
}

export default TeamMembers
