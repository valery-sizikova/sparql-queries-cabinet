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
    id: string,
    queryName: string,
    onSelect(): void
}

// Defines the interface of the properties of Editor component
interface IEditorProps {
    query: IQuery,
    onSave(query: IQuery): void
}

// Defines the interface of the state of Editor component
interface IEditorState {
    query: IQuery
}

// Defines the interface of the properties of AppContainer component
interface IAppContainerProps {
    appName: string
}

// Defines the interface of the state of AppContainer component
interface IAppContainerState {
    selectedQuery: string,
    queries: Array<IQuery>,
    recentlyAddedQueries: Array<string>
}