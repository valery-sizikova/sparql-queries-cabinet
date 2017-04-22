// Defines the interface of the structure of a Query
interface IQuery {
    id: string,
    name: string,
    description: string,
    creator: string,
    query: string
}

// Defines the interface of the properties of QueryItem component
interface IQueryItemProps {
    key: string,
    query: IQuery,
    onSelect: any
    //currently_selected: boolean,
    //onSave: void,
    //onRun: void,
    //onEdit: void,
    //onDelete: void
}

// Defines the interface of the state of QueryItem component
interface IQueryItemState {
    editText: string
}

// Defines the interface of the properties of Editor component
interface IEditorProps {
    queryText: string,
    descriptionText: string
}

// Defines the interface of the state of Editor component
interface IEditorState {
    editQueryText: string,
    editDescriptionText: string
}

// Defines the QueryAppModel interface
interface IQueryAppModel {
    key: string,
    name: string,
    select(queryId: string): void
    //queries: Array<IQuery>,
    //onChanges: Array<any>,
    //subscribe(onChange),
    //inform(),
    //addQuery(title: string),
    //destroy(queryToDestroy),
    //save(queryToSave, text)
}

// Defines the interface of the properties of AppContainer component
interface IAppContainerProps {
    model: IQueryAppModel
}

// Defines the interface of the state of AppContainer component
interface IAppContainerState {
    selectedQuery: string,
    queries: Array<IQuery>
}