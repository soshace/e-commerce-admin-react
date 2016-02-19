import React from 'react';
import { LocationStore } from './../../../stores';
import { ProjectActions, LocationActions } from './../../../actions';
import _ from 'underscore';


class SettingsInternational extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: this.props.project,
            countries: [],
            languages: [],
            currencies: [],
            selected: {}
        };

        this._generateSelect = this._generateSelect.bind(this);
        this._onLocationInfoGet = this._onLocationInfoGet.bind(this);
        this._updateLocationInfo = this._updateLocationInfo.bind(this);
    }

    componentDidMount() {
        LocationStore.addChangeListener(this._onLocationInfoGet);
        LocationActions.getLanguages();
        LocationActions.getCurrencies();
        LocationActions.getCountries();
    }

    componentWillUnmount() {
        LocationStore.removeChangeListener(this._onLocationInfoGet);
    }

    componentWillReceiveProps(newProps) {
        this.setState({project: newProps.project});
    }

    render() {
        var { project, countries, languages, currencies } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        Currencies
                    </div>
                    <div className="panel-body">
                        {project.currencies.map(function (currency) {
                            return (
                                <div key={currency} className="inline label green label-lg">
                                    <span>{currency}</span>
                                    <a className="glyphicon glyphicon-remove"></a>
                                </div>
                            )
                        })}
                        {this._generateSelect(currencies, 'currency')}
                        <button type="submit"
                                onClick={this._updateLocationInfo.bind(this, 'currency', false)}
                                className="btn btn-info m-t">Add</button>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        Languages
                    </div>
                    <div className="panel-body">
                        {project.languages.map(function (currency) {
                            return (
                                <div key={currency} className="inline label green label-lg">
                                    <span>{currency}</span>
                                    <a className="glyphicon glyphicon-remove"></a>
                                </div>
                            )
                        })}
                        {this._generateSelect(languages, 'language')}
                        <button type="submit"
                                onClick={this._updateLocationInfo.bind(this, 'language', false)}
                                className="btn btn-info m-t">Add</button>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading bg-white">
                        Countries
                    </div>
                    <div className="panel-body">
                        {project.countries.map(function (currency) {
                            return (
                                <div key={currency} className="inline label green label-lg">
                                    <span>{currency}</span>
                                    <a className="glyphicon glyphicon-remove"></a>
                                </div>
                            )
                        })}
                        {this._generateSelect(countries, 'country')}
                        <button type="submit"
                                onClick={this._updateLocationInfo.bind(this, 'country', false)}
                                className="btn btn-info m-t">Add</button>
                    </div>
                </div>
            </div>
        )
    }

    _onLocationInfoGet() {
        var { countries, languages, currencies } = LocationStore,
            { selected } = this.state;
        if (countries && languages && currencies) {
            selected.country = countries[0].isoCode;
            selected.language = languages[0].isoCode;
            selected.currency = currencies[0].isoCode;
            this.setState({countries, languages, currencies});
        }
    }

    _onFieldUpdate(field, e) {
        var { selected } = this.state;
        selected[field] = e.target.value;
        this.setState({selected: selected});
    }

    _updateLocationInfo(field, remove) {
        var { project, selected } = this.state,
            arrName;

        switch(field) {
            case 'country':
                arrName = 'countries';
                break;
            case 'language':
                arrName = 'languages';
                break;
            case 'currency':
                arrName = 'currencies';
                break;
        }

        if (remove) {

        } else {
            if (project[arrName].indexOf(selected[field]) < 0) {
                project[arrName].push(selected[field]);
            }
        }

        ProjectActions.updateProject(project.id, project);
    }

    _generateSelect(options, field) {
        var { selected } = this.state;
        return (
            <select name={field}
                    value={selected[field]}
                    onChange={this._onFieldUpdate.bind(this, field)}
                    className="form-control">
                {options.map(function (item, index) {
                    return (<option key={index} value={item.isoCode}>{`${item.name} (${item.isoCode})`}</option>)
                })}
            </select>
        )
    }
}

export default SettingsInternational
