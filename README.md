# SPARQL Queries Cabinet

This app allows to create, view, edit, run and delete SPARQL queries.

## Build instructions

## UX concept
The app has only one screen on which all the actions can be performed and all relevant data is displayed. It is possible to create and edit several queries at the same time. It is easy to switch between existing queries and see the tab where it is possible to edit it and run. The autosave is implimented within the app so no data would be lost while user is working at the cabinet. When it comes to running the queries user can choose the prefered format to display the results.

## Architechture
- Container & Presenttional (stateless/UI related state) components
- Reducing amount of requests to server - wasMutated status of current query
- Using promisses for async requests

## UI Design
- simple bootstap design with a few tweaks
