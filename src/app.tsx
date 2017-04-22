/// <reference path="../typings/modules/react/index.d.ts" />
/// <reference path="./interfaces.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";

import AppContainer from './components/container/AppContainer';

function render() {
    ReactDOM.render(
        <AppContainer appName={'List of SPARQL Queries'}/>,
        document.getElementById("root")
    );
}

render();