import React from "react";
import { Link } from "react-router-dom";
import { Content, Page, Directory } from "./MarkdownPages";

/* only supporting depth of 2 right now */

interface MultiLinkProps {
    directory: Directory
}

class MultiLink extends React.Component<MultiLinkProps> {
    state: { pages: Array<JSX.Element> }
    constructor(props: MultiLinkProps) {
        super(props);
        this.state = {
            pages: props.directory.pages.map((page: Page) => {
                return (<li id={name}><Link to={page.route}>{page.name}</Link></li>);
            })
        };
    }
    render() {
        return (
            <li key={"directory_" + this.props.directory.title + this.props.directory.title} className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">
                    {this.props.directory.title}
                    <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    {this.state.pages}
                </ul>
            </li>
        )
    }
}
class NavigationLinks extends React.Component {
    state: { pages: Array<JSX.Element>, multiPages: Array<JSX.Element> }
    constructor(props) {
        super(props);
        this.state = {
            pages: Content.pages.map((page: Page) => {
                return (<li key={page.name}><Link to={page.route}>{page.name}</Link></li>);
            }),
            multiPages: Content.children.map((directory: Directory) => {
                return <MultiLink key={"dir_"+directory.title} directory={directory} />
            })
        };
    }
    render() {
        return (
            <div className="collapse navbar-collapse" id="navLinks">
                <ul className="nav navbar-nav">
                    {this.state.pages}
                    {this.state.multiPages}
                </ul>
            </div>
        );
    }
}



export default class NavigationBar extends React.Component {
    public render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navLinks" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Angelo Carrabba</Link>
                    </div>
                    < NavigationLinks />
                </div>
            </nav>
        );
    }
}