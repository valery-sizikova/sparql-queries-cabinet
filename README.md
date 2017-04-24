# SPARQL Queries Cabinet

This app allows to create, view, edit, run and delete SPARQL queries.

## Build instructions

1. Download the ZIP of this repository. Unpack the archive and navigate to project folder in your terminal.
2. Install dependencies
```
npm install
```
3. Run the build script to build all the project files
```
npm run build
```
4. Start the server and the app will automatically open in your browser.
```
npm start
```

## UX concept
The app has only one screen on which all the actions can be performed and all relevant data is displayed. It is possible to create and edit several queries at the same time. It is easy to switch between existing queries and see the tab where it is possible to edit it and run. The autosave is implemented within the app so no data would be lost while the user is working at the cabinet. When it comes to running the queries user can choose the preferred format to display the results.

## Architecture
The app is built using 4 components - one container component, which provides other three presentational components with data and behavior. 

Container component doesn't include any DOM markup but only wrappers for presentational components. Mainly it is busy with data operations (executing of API requests) and with determining the interaction between "view" components. It also maintains the state of the application.

Presentational components are basically stateless (except Editor component, which has only UI state) and they are created to simply render the app functional parts and data.

For making requests to the API I have chosen [axios](https://github.com/mzabriskie/axios) promise based HTTP client. It's a simple way of handling asynchronous requests and performing actions on the retrieved data.

As I have decided to implement autosave feature in this app I had to solve the challenge of not sending POST and PUT requests to the server too often as it can decrease the app performance. That's why I have decided to fetch data once when the user loads the application and then perform all the actions on a local copy of the response. I also reduced the number of PUT requests by checking if any editing actions were performed on a particular query and sending the request only in case they were.

## UI Design
As for UI design, I have decided to go with an easy and clean Bootstrap solution. This allowed me not to spend time on styling the app and yet have a visually pleasant interface. As it was the first time I used TypeScript and container/presentational components approach - I have chosen to invest more time in the app architectural design and not the styling.
