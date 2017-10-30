import React from 'react';

import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import WebView from "./WebView.Component";
import NavigationBar from "./Navigation";

interface RoutesProps {
    baseUrl: string;
}

export default class Pages extends React.Component<RoutesProps> {
    public render() {
        return (
            <Router ref="router" basename={this.props.baseUrl}>
                <div>
                    <NavigationBar />
                    <WebView />
                    <div id="footerPadding"></div>
                    <div id="footer">
                        <div style={{ verticalAlign: "middle", height: "100%" }}>
                            <a href="mailto:acarrab@g.clemson.edu"><i className="fa fa-envelope" aria-hidden="true"></i></a>
                            <a href="https://github.com/acarrab"><i className="fa fa-github" aria-hidden="true"></i></a>
                            <a href="https://www.linkedin.com/in/acarrab/"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

}