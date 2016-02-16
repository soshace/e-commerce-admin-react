import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };

        this.props = {
            onClick: function () {
            },
            avatarSrc: ''
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({name: newProps.name, email: newProps.email});
    }

    render() {
        var handleClick = this.props.onClick,
            { user } = this.state;
        return (
            <div className="p hidden-folded blue-50"
                 style={{backgroundImage: "url(images/bg.png)",  backgroundSize: "cover"}}>
                <div className="rounded w-64 bg-white inline pos-rlt">
                    <img src={this.props.avatarSrc} className="img-responsive rounded"/>
                </div>
                <a className="block m-t-sm" onClick={handleClick}>
                    <span className="block font-bold">{user.name}</span>
                    <span className="pull-right auto">
                        <i className="fa inline fa-caret-down"></i>
                        <i className="fa none fa-caret-up"></i>
                    </span>
                    {user.email}
                </a>
            </div>
        )
    }
}

export default ProfileInfo
