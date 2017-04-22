/// <reference path="../typings/modules/react/index.d.ts" />
/// <reference path="./interfaces.d.ts"/>

import * as React from "react";

export default class Editor extends React.Component<IEditorProps, {}> {
    render() {
        return <div>
            <p>{this.props.descriptionText}</p>
            <p>{this.props.queryText}</p>
        </div>;
    }
}