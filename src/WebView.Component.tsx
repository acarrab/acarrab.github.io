import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { CompiledRoutes } from "./MarkdownPages"


export default class WebView extends React.Component {
    public render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="hidden-xs-down col-sm-1 col-md-2 col-lg-2"></div>
                    <div className="col-xs-12 col-sm-10 col-md-8 col-lg-8 mainContent">
                        <CompiledRoutes />
                    </div>
                </div>
            </div>
        );
    }
}
