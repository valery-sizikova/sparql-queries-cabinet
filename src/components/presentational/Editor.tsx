/// <reference path="../../../typings/modules/react/index.d.ts" />
/// <reference path="./../../interfaces.d.ts"/>

import * as React from "react";

export default class Editor extends React.Component<IEditorProps, IEditorState> {

    constructor(props:IEditorProps) {
        super(props);

        this.state = {
            query: this.props.query
        }
    }

    public handleNameEditing(e: any) {
        var state = this.state;
        state.query.name = e.target.value;
        this.setState(state);
    }

    public handleDescriptionEditing(e: any) {
        var state = this.state;
        state.query.description = e.target.value;
        this.setState(state);
    }

    public handleQueryEditing(e: any) {
        var state = this.state;
        state.query.query = e.target.value;
        this.setState(state);
    }

    render() {
        return <div>
            <p>Name:
                <input type="text" value={this.state.query.name} onChange={this.handleNameEditing.bind(this)} />
            </p>
            <p>Description:
                <input type="text" value={this.state.query.description} onChange={this.handleDescriptionEditing.bind(this)} />
            </p>
            <p>Query:
                <textarea value={this.state.query.query} onChange={this.handleQueryEditing.bind(this)} />
            </p>
            <div style={{marginTop: '50px'}}>
                <button className="btn btn-primary" onClick={this.props.onSave.bind(this, this.state.query)}>Save</button>
            </div>
        </div>;
    }
}