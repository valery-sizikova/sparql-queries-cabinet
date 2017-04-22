/// <reference path="../typings/modules/react/index.d.ts" />
/// <reference path="./interfaces.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from 'axios';
import {Promise} from 'es6-promise';

import {QueryAppModel} from "./QueryAppModel";
import QueryItem from "./QueryItem";
import Editor from "./Editor";
import {Utils} from "./utils";

export class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {

    constructor(props:IAppContainerProps) {
        super(props);

        this.state = {
            selectedQuery: '',
            queries: []
        };
    }

    public componentDidMount() {
        var that = this;

        axios.get(`http://test.semmweb.com/sparql-cabinet/api/sparql/queries?api_key=c45480aa-f4a5-4224-a9fe-a8ecc2353a64`)
            .then(function (response) {
                that.setState({queries: response.data, selectedQuery: '0'})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    public selectQuery(queryId:string) {
        this.props.model.select(queryId);
        this.setState({queries: this.state.queries, selectedQuery: queryId})
    }

    public render() {

        var that = this;

        if (this.state.queries.length > 0) {
            return <div>
                <div className="col-xs-4">
                    <p>{this.props.model.name}</p>
                    {this.state.queries.map(query => {
                        return <QueryItem key={query.id} query={query}
                                          onSelect={this.selectQuery.bind(this, query.id)}/>
                        })}
                </div>
                <div className="col-xs-5">
                    {this.state.queries.map(query => {
                        if (query.id == that.state.selectedQuery) {
                            return <Editor key={query.id} queryText={query.query} descriptionText={query.description}/>
                            }
                        })}
                </div>
            </div>
        } else {
            return <div>There are no Queries in the List</div>
        }
    }
}

var model = new QueryAppModel('key');

function render() {
    ReactDOM.render(
        <AppContainer model={model}/>,
        document.getElementById("root")
    );
}

render();