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

    public handleNameEditing(e:any) {
        var state = this.state;
        this.props.setQueryToMutated(true);

        state.query.name = e.target.value;
        this.setState(state);
    }

    public handleDescriptionEditing(e:any) {
        var state = this.state;
        this.props.setQueryToMutated(true);

        state.query.description = e.target.value;
        this.setState(state);
    }

    public handleQueryEditing(e:any) {
        var state = this.state;
        this.props.setQueryToMutated(true);

        state.query.query = e.target.value;
        this.setState(state);
    }

    render() {
        if (this.state.query.id !== '') {
            return <div className="editor">
                <div className="tab-controls">
                    <button className="btn btn-primary mx-2" onClick={this.props.onSave.bind(this, this.state.query)}>
                        Save
                    </button>
                    <button className="btn btn-primary" onClick={this.props.onRun.bind(this, this.state.query.query)}>
                        Run
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="name-input">Name</label>
                    <input type="text" id="name-input" className="form-control" value={this.state.query.name}
                           onChange={this.handleNameEditing.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description-input">Description</label>
                    <textarea type="text" id="description-input" rows="2" className="form-control"
                              value={this.state.query.description}
                              onChange={this.handleDescriptionEditing.bind(this)}/>
                </div>
                <div className="form-group" style={{height: 'calc(100% - 200px)'}}>
                    <label htmlFor="query-input">Query</label>
                    <textarea type="text" id="query-input" className="form-control" value={this.state.query.query}
                              placeholder="Start typing your query..." onChange={this.handleQueryEditing.bind(this)}/>
                </div>
            </div>;
        } else {
            return <p></p>
        }
    }
}