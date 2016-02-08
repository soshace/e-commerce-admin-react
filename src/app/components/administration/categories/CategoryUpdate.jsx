import React from 'react';
import CategoryStore from './../../../stores/CategoryStore.js';
import CategoryActions from './../../../actions/CategoryActions.js';


class CategoryUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {}
        };

        this._onCategoryGet = this._onCategoryGet.bind(this);
        this._onFieldUpdate = this._onFieldUpdate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(this._onCategoryGet);
    }

    componentWillUnmount() {
        CategoryStore.removeChangeListener(this._onCategoryGet);
    }

    componentWillReceiveProps(newProps) {
        this.setState({category: newProps.category});
    }

    render() {
        var category = this.state.category;
        return (
            <div className="panel-body">
                <form role="form" className="form-horizontal p-md col-md-12"
                      onSubmit={this._onSubmit}>
                    <div className="form-group">
                        <label className="col-sm-1 control-label">Name</label>

                        <div className="col-sm-11">
                            <input
                                type="text"
                                value={category.name}
                                onChange={this._onFieldUpdate('name')}
                                className="form-control"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info m-t">Save</button>
                </form>
            </div>
        )
    }

    _onFieldUpdate(field) {
        var self = this;
        return e => {
            var category = this.state.category;
            category[field] = e.target.value;
            self.setState({category: category});
        };
    }

    _onSubmit(e) {
        e.preventDefault();
        var category = this.state.category;
        CategoryActions.updateCategory(category);
    }

    _onCategoryGet() {

    }
}

export default CategoryUpdate
