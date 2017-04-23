/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";
import axios from "axios";
import {Promise} from "es6-promise";

import QueryItem from "./../presentational/QueryItem";
import Editor from "./../presentational/Editor";
import Result from "./../presentational/Result";
import {Utils} from "./../../utils";
import {Constants} from "./../../constants";

export default class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {

    constructor(props:IAppContainerProps) {
        super(props);

        this.state = {
            selectedQuery: '',
            queries: [],
            recentlyAddedQueries: [],
            resultFormat: 'text/csv',
            result: ''
        };
    }

    public componentDidMount() {
        this.fetchData(true);
    }

    public fetchData(withFirstQuerySelection:boolean) {
        var that = this;
        var state = this.state;

        axios.get(`http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64`)
            .then(function (response) {
                state.queries = response.data;
                withFirstQuerySelection === true && response.data.length !== 0 ? state.selectedQuery = response.data[0].id : '';
                that.setState(state);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    public selectQuery(queryId:string) {
        if (queryId !== this.state.selectedQuery) {
            var state = this.state;
            state.selectedQuery = queryId;
            this.setState(state);
        }
    }

    public createNewQuery() {
        var newQuery = {
            id: Utils.uuid(),
            name: 'New SPARQL Query',
            description: '',
            creator: Constants.CURRENT_USER,
            query: ''
        };

        var state = this.state;

        state.queries.push(newQuery);
        state.recentlyAddedQueries.push(newQuery.id);
        state.selectedQuery = newQuery.id;

        this.setState(state);
    }

    public saveQuery(query:IQuery) {

        var that = this;

        if (this.state.recentlyAddedQueries.indexOf(query.id) > -1) {
            var data = JSON.stringify(query);
            axios.post('http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64', data, {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(function (response) {
                    that.fetchData(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            var data = JSON.stringify(query);
            axios.put('http://test.semmweb.com/sparql-cabinet/api/sparql/queries/' + query.id + '?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64', data, {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(function (response) {
                    that.fetchData(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
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

        axios.delete('http://test.semmweb.com/sparql-cabinet/api/sparql/queries/' + queryId + '?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64')
            .then(function (response) {
                that.fetchData(false);
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

    public render() {
        var that = this;

        if (this.state.queries.length > 0) {
            return <div>
                <div className="col-xs-3">
                    <p>{this.props.appName}</p>
                    {this.state.queries.map(query => {
                        return <QueryItem key={query.id} queryName={query.name} id={query.id}
                                          onSelect={this.selectQuery.bind(this, query.id)}
                                          onDelete={this.deleteQuery.bind(this, query.id)}/>
                        })}
                    <button className="btn btn-primary" onClick={this.createNewQuery.bind(this)}>Add query</button>
                </div>
                <div className="col-xs-3">
                    {this.state.queries.map(query => {
                        if (query.id == that.state.selectedQuery) {
                            return <Editor key={query.id} query={query} onSave={this.saveQuery.bind(this)}
                                           onRun={this.runQuery.bind(this)}/>
                            }
                        })}
                </div>
                <div className="col-xs-6">
                    <Result format={this.state.resultFormat} result={this.state.result}
                            onChangeFormat={this.changeFormat.bind(this)}/>
                </div>
            </div>
        } else {
            return <div>
                There are no Queries in the List
                <button className="btn btn-primary" onClick={this.createNewQuery.bind(this)}>Add query</button>
            </div>
        }
    }
}