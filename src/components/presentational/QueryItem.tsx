/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";

export default class QueryItem extends React.Component<IQueryItemProps, {}> {
    render() {
        return <div onClick={this.props.onSelect}>{this.props.queryName}</div>;
    }
}