/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";

export default class QueryItem extends React.Component<IQueryItemProps, {}> {
    render() {
        return <div>
            <div onClick={this.props.onSelect}>{this.props.queryName}</div>
            <button className="btn btn-primary" onClick={this.props.onDelete}>x</button>
        </div>;
    }
}