/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";

export default class QueryItem extends React.Component<IQueryItemProps, {}> {
    render() {
        return <div className="query-item-wrapper">
            <div className="query-item query-name" onClick={this.props.onSelect}>{this.props.queryName}</div>
            <button className="btn btn-link query-item delete-btn" onClick={this.props.onDelete}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>;
    }
}