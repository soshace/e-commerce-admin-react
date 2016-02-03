import React from 'react';
import classnames from 'classnames';


class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-9 b-l bg-white bg-auto">
                <div className="p-md bg-light lt b-b font-bold">Public profile</div>
                <form role="form" className="p-md col-md-6">
                    <div className="form-group">
                        <label>Profile picture</label>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>URL</label>
                        <input type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Company</label>
                        <input type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control"/>
                    </div>

                    <div className="checkbox">
                        <label className="ui-checks">
                            <input type="checkbox"/><i></i> Available for hire
                        </label>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default CompanyProfile
