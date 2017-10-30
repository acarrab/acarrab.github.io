import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
//import NavigationBar from "./navigation/NavigationBar.Component";
import WebView from "./WebView.Component";
import NavigationBar from './Navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pages from "./Pages";
var baseUrl = "/"; // my base url for school web page

if (process.env.NODE_ENV === 'development') {
    baseUrl = "/";
}
render((
    <MuiThemeProvider>
        <Pages  baseUrl={baseUrl}/>
    </MuiThemeProvider >
), document.getElementById("app"));
