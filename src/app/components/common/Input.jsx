import React from 'react';
import classnames from 'classnames';


class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            successState: false,
            errorState: false
        };

        this.showSuccess = this.showSuccess.bind(this);
        this.hideSuccess = this.hideSuccess.bind(this);
    }

    showSuccess(msg) {
        this.setState({message: msg, successState: true});
        setTimeout(this.hideSuccess, 3000);
    }

    hideSuccess() {
        this.setState({message: '', successState: false});
    }

    render() {
        var {message, successState, errorState} = this.state,
            inputClassName = classnames(this.props.className, "form-control"),
            containerClassName = classnames({
                'has-success': successState,
                'has-error': errorState
            });

        return (
            <div className={containerClassName}>
                <input className={inputClassName} {...this.props} />
                <span className="help-block m-b-none">{message}</span>
            </div>
        )
    }


}

export default Input
