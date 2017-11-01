import React from "react";
import { Link, withRouter } from "react-router-dom";
import { object } from "prop-types"
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
                return <MultiLink key={"dir_" + directory.title} directory={directory} />
            })
        };
    }
    render() {
        return (
            <ul className="nav navbar-nav">
                {this.state.pages}
                {this.state.multiPages}
            </ul>
        );
    }
}

interface Location {
    pathname: string
}
interface History {
    location: Location
}
interface NavigationBarProps {
    history?: History;
}



class NavigationBar extends React.Component<NavigationBarProps> {
    state: { onHomePage: boolean }
    constructor(props) {
        super(props);
        this.state = { onHomePage: true }
        if (props.history !== undefined) {
            this.state.onHomePage = props.history.location.pathname === "/";
        }
    }
    componentDidUpdate(prevProps: NavigationBarProps) {
        if (this.props.history !== undefined && prevProps.history !== undefined) {
            if (this.props.history.location.pathname === "/") {
                if (this.state.onHomePage === false) { this.setState({ onHomePage: true }); }
            } else {
                if (this.state.onHomePage === true) { this.setState({ onHomePage: false }); }
            }
        }
    }
    public render() {
        if (this.state.onHomePage) {
            return (
                <nav className="navbar navbar-default">
                    <div style={{ margin: "0 auto", textAlign: "center" }}>
                        <NavigationLinks />
                    </div>
                </nav >
            );
        } else {
            return (
                <nav className="navbar navbar-default">
                    <div className="brandContainer">
                        <Link className="navbar-brand" to="/">Angelo Carrabba</Link>
                    </div>
                    <div className="nextToBrand">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navLinks" aria-expanded="false">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse " id="navLinks" style={{ width: "100%" }}>
                            < NavigationLinks />
                        </div>
                    </div>
                </nav >
            );
        }
    }
}

export default withRouter(NavigationBar);