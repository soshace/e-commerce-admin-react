import React from 'react';

class NewProject extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        return (
            <form className="form-horizontal p-h-xsform-horizontal p-h-xs">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Project Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Project name" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Project Key</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Project key" />
                    </div>
                </div>
                <div className="form-group m-t-lg">
                    <div className="col-sm-4 col-sm-offset-2">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default NewProject
