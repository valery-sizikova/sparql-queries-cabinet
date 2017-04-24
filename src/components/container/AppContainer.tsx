/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";
import axios from "axios";
import {Promise} from "es6-promise";

import QueryItem from "./../presentational/QueryItem";
import Editor from "./../presentational/Editor";
import Result from "./../presentational/Result";
import {Constants} from "./../../constants";

export default class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {

    constructor(props:IAppContainerProps) {
        super(props);

        this.state = {
            selectedQuery: {
                id: '',
                name: '',
                description: '',
                creator: '',
                query: ''
            },
            queries: [],
            recentlyAddedQuery: '',
            resultFormat: 'text/csv',
            result: '',
            wasMutated: false
        };
    }

    public componentDidMount() {
        this.fetchData();
    }

    public fetchData() {
        var that = this;
        var state = this.state;

        axios.get(`http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64`)
            .then(function (response) {
                state.queries = response.data;

                //sorting of queries by time of creation (id is a timestamp), descending
                state.queries.sort(function (a, b) {
                    return parseFloat(b.id) - parseFloat(a.id);
                });

                response.data.length !== 0 ? state.selectedQuery = state.queries[0] : '';

                that.setState(state);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    public selectQuery(query:IQuery) {
        if (query.id !== this.state.selectedQuery.id) {
            // save current query before switching to the other
            this.saveQuery(this.state.selectedQuery);

            // select the new query
            var state = this.state;
            state.selectedQuery = query;
            state.result = '';
            this.setState(state);
        }
    }

    public createNewQuery(isFirstQuery:boolean) {
        var newQuery = {
            id: Date.now().toString(),
            name: 'New SPARQL Query',
            description: '',
            creator: Constants.CURRENT_USER,
            query: ''
        };

        var state = this.state;

        isFirstQuery ? state.selectedQuery = newQuery : this.selectQuery(newQuery);

        state.queries.unshift(newQuery);
        state.recentlyAddedQuery = newQuery.id;
        this.setState(state);
    }

    public saveQuery(query:IQuery) {
        var that = this;
        var data = JSON.stringify(query);

        if (this.state.recentlyAddedQuery === query.id) {
            var state = that.state;

            state.recentlyAddedQuery = '';
            that.setState(state);
            axios.post('http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64', data, {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(function (response) {
                    that.setCurrentQueryToMutated(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            if (this.state.wasMutated) {
                axios.put('http://test.semmweb.com/sparql-cabinet/api/sparql/queries/' + query.id + '?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64', data, {
                        headers: {'Content-Type': 'application/json'}
                    })
                    .then(function (response) {
                        that.setCurrentQueryToMutated(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    public runQuery(queryString:string) {
        var that = this;
        axios.get(`http://test.semmweb.com/rdf4j-server/repositories/pizza`, {
                params: {query: queryString},
                headers: {'Content-Type': 'application/sparql-query', 'Accept': that.state.resultFormat}
            })
            .then(function (response) {
                var state = that.state;
                state.result = that.state.resultFormat === 'application/sparql-results+json' ? JSON.stringify(response.data) : response.data;
                that.setState(state);
            })
            .catch(function (error) {
                console.log(error);
                alert('Not possible to run this query. Following error happened:\n\n' + error + '\n\nPlease correct the query and run it again.');
            })
    }

    public deleteQuery(queryId:string) {
        var that = this;
        this.saveQuery(this.state.selectedQuery);

        axios.delete('http://test.semmweb.com/sparql-cabinet/api/sparql/queries/' + queryId + '?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64')
            .then(function (response) {
                that.fetchData();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    public changeFormat(format:string) {
        var state = this.state;

        state.resultFormat = format;
        this.setState(state);
    }

    public setCurrentQueryToMutated(wasMutated:boolean) {
        var state = this.state;

        state.wasMutated = wasMutated;
        this.setState(state);
    }

    public render() {

        var queries, addButton;

        if (this.state.queries.length > 0) {
            queries = this.state.queries.map(query => {
                return <QueryItem key={query.id} queryName={query.name} id={query.id}
                                  onSelect={this.selectQuery.bind(this, query)}
                                  onDelete={this.deleteQuery.bind(this, query.id)}/>
            });
            addButton = <button className="btn btn-primary" onClick={this.createNewQuery.bind(this, false)}>
                Add query
            </button>;
        } else {
            queries = <p>There are no queries in the list</p>;
            addButton = <button className="btn btn-primary" onClick={this.createNewQuery.bind(this, true)}>
                Add first query
            </button>;
        }

        return <div className="app-container">
            <div className="col-xs-2 list-container">
                <p className="app-name">{this.props.appName}</p>
                {queries}
                {addButton}
            </div>
            <div className="col-xs-4 editor-container">
                <p className="tab-header">QUERY</p>
                <Editor key={this.state.selectedQuery.id} query={this.state.selectedQuery}
                        onSave={this.saveQuery.bind(this)}
                        onRun={this.runQuery.bind(this)}
                        setQueryToMutated={this.setCurrentQueryToMutated.bind(this)}/>
            </div>
            <div className="col-xs-6 result-container">
                <p className="tab-header">RESULTS</p>
                <Result format={this.state.resultFormat} result={this.state.result}
                        onChangeFormat={this.changeFormat.bind(this)}/>
            </div>
        </div>
    }
}