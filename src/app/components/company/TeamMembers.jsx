import React from 'react';
import classnames from 'classnames';
import { TeamActions } from './../../actions';


class TeamMembers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            members: this.props.team && this.props.team.members
        };

    }

    componentWillReceiveProps(newProps) {
        this.setState({members: this.props.team.members});
    }

    render() {
        var { members } = this.state,
            self = this;
        return (
            <div>
                {members.map(function (member) {
                    return (
                        <div key={member.id} className="inline w-xs">
                            <a className="glyphicon glyphicon-remove"
                               onClick={self._removeMember.bind(self, member)}></a>
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

    _removeMember(member) {
        TeamActions.removeMember();
    }
}

export default TeamMembers
