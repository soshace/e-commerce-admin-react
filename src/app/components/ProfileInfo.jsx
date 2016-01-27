import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);

        this.props = {
            onClick: function () {
            },
            avatarSrc: '',
            email: '',
            name: ''
        }
    }

    render() {
        var handleClick = this.props.onClick;
        return (
            <div className="p hidden-folded blue-50"
                 style={{backgroundImage: "url(images/bg.png)",  backgroundSize: "cover"}}>
                <div className="rounded w-64 bg-white inline pos-rlt">
                    <img src={this.props.avatarSrc} className="img-responsive rounded"/>
                </div>
                <a className="block m-t-sm" onClick={handleClick}>
                    <span className="block font-bold">{this.props.name}</span>
                    <span className="pull-right auto">
                        <i className="fa inline fa-caret-down"></i>
                        <i className="fa none fa-caret-up"></i>
                    </span>
                    {this.props.email}
                </a>
            </div>
        )
    }
}

export default ProfileInfo
