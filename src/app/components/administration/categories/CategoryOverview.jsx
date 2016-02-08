import React from 'react';


class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {}
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({category: newProps.category});
    }

    render() {
        var category = this.state.category;
        return (
            <div className="row">
                <label className="col-sm-2 control-label">Name:</label>

                <div className="col-sm-10">{category.name}</div>
            </div>
        )
    }

}

export default CategoryDetail
