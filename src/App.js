import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import RouteNavItem from './components/RouteNavItem';
import Routes from "./Routes";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freshService: {
                apiKey: ""
            }
        };
    }

    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }

    render() {
        const childProps = {
            freshServiceData: this.state.freshService
        };

        return (
            <div className="App">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">911 L2 Portal</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav pullRight>
                            <RouteNavItem key={1} onClick={this.handleNavLink} href="/kanban">Kanban Board</RouteNavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default withRouter(App);