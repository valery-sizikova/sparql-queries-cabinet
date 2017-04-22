/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";
import axios from "axios";
import {Promise} from "es6-promise";

import QueryItem from "./../presentational/QueryItem";
import Editor from "./../presentational/Editor";
import {Utils} from "./../../utils";
import {Constants} from "./../../constants";

export default class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {

    constructor(props:IAppContainerProps) {
        super(props);

        this.state = {
            selectedQuery: '',
            queries: [],
            recentlyAddedQueries: []
        };
    }

    public componentDidMount() {
        var that = this;
        var state = this.state;

        axios.get(`http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64`)
            .then(function (response) {
                state.queries = response.data;
                state.selectedQuery = '';
                that.setState(state)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    public selectQuery(queryId: string) {
        var state = this.state;

        state.selectedQuery = queryId;
        this.setState(state)
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

    public saveQuery(query: IQuery) {

        if (this.state.recentlyAddedQueries.indexOf(query.id) > -1) {
            console.log('saved');
        } else {
            console.log('edited');
        }

        this.state.queries.map((item, index) => {
            if (item.id === query.id) {
                var state = this.state;

                state.queries[index] = query;
                this.setState(state);
            }
        })
    }

    public render() {
        var that = this;

        if (this.state.queries.length > 0) {
            return <div>
                <div className="col-xs-4">
                    <p>{this.props.appName}</p>
                    {this.state.queries.map(query => {
                        return <QueryItem key={query.id} queryName={query.name} id={query.id}
                                          onSelect={this.selectQuery.bind(this, query.id)}/>
                        })}
                    <button className="btn btn-primary" onClick={this.createNewQuery.bind(this)}>Add query</button>
                </div>
                {<div className="col-xs-5">
                    {this.state.queries.map(query => {
                        if (query.id == that.state.selectedQuery) {
                            return <Editor key={query.id} query={query} onSave={this.saveQuery.bind(this)}/>
                            }
                        })}
                </div>}
            </div>
        } else {
            return <div>There are no Queries in the List</div>
        }
    }
}