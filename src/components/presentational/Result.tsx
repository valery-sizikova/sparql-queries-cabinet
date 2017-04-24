/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";

export default class Result extends React.Component<IResultProps, {}> {

    public handleResultFormatChange(e:any) {
        this.props.onChangeFormat(e.target.value);
    }

    render() {
        return <div className="results">
            <div className="tab-controls form-group">
                <select className="form-control" value={this.props.format}
                        onChange={this.handleResultFormatChange.bind(this)}>
                    <option value="text/csv">CSV</option>
                    <option value="text/tab-separated-values">TSV</option>
                    <option value="application/sparql-results+xml">XML</option>
                    <option value="application/sparql-results+json">JSON</option>
                </select>
            </div>
            <textarea disabled={true} value={this.props.result} placeholder="Your results will be here once you run your query"/>
        </div>;
    }
}