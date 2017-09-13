import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Col,
  FormControl,
  FormGroup,
  Grid,
  InputGroup,
  Jumbotron,
  Panel, 
  Row,
//   Well,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Board } from 'react-trello'
import { invokeBackend } from '../libs/webservice'
import './KanbanBoard.css'

/*
{
    id
    subject
    assignee
    status
    priority
    portal_url
    jira_url
    created_at
    updated_at
}
*/
const CustomCard = props => {
    const CardSubject = (
        <h4>{props.subject}</h4>
    );
    
    return (
        <div style={{ minWidth: 450, }}>
            <Panel header={CardSubject} bsStyle="primary">
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={4} md={4}>Status: </Col>
                        <Col xs={14} md={8}>{props.status}</Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={4} md={4}>Priority: </Col>
                        <Col xs={14} md={8}>{props.priority}</Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={4} md={4}>Assigned to: </Col>
                        <Col xs={14} md={8}>{props.assignee}</Col>
                    </Row>
                    <ButtonGroup justified>
                        <Button bsStyle="primary" href={props.portal_url}>Portal</Button>
                        <Button bsStyle="warning" disabled={!props.jira_url} href={props.jira_url?props.jira_url:"#"}>Jira</Button>
                    </ButtonGroup>
                </Grid>
            </Panel>
        </div>
    )
}

class KanbanBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            dataIsLoaded: false,
            boardData: {
                lanes: []
            },
            ticketViewNumber: '1000187655',
            api_key: ''
        }
    }

    getBoard() {
        const queries = {
            'format': 'json',
            'page': 1
        };
        var response = invokeBackend({path: '/helpdesk/tickets/view/' + this.state.ticketViewNumber, queries, method: 'GET'}, this.state.api_key);
        // const response = "";

        return response;
    }

    renderBoard() {
        return (
            <div className="App-intro">
                <Board data={this.state.boardData} customCardLayout>
                    <CustomCard />
                </Board>
            </div>
        )
    }

    updateBoardData = (data) => {
        this.setState({
            boardData: data
        });
    }

    handleInitSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const response = await this.getBoard();
            this.updateBoardData(response);
            
            this.setState({
                dataIsLoaded: true,
                isLoading: false
            });
        }
        catch(e) {
            alert(e);
            this.setState({ isLoading: false });
        }

    }

    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    renderPreLoad() {
        return (
            <div className="Board-intro">
                <form onSubmit={ this.handleInitSubmit } >
                    <FormGroup controlId="api_key" bsSize="large">
                        <InputGroup>
                            <InputGroup.Addon>
                                Api Key: 
                            </InputGroup.Addon>
                            <FormControl
                                value={this.state.api_key}
                                onChange={this.handleChange}
                                type="text"
                            />
                        </InputGroup>
                    </FormGroup>
            
                    <FormGroup controlId="ticketViewNumber" bsSize="large">
                        <InputGroup>
                            <InputGroup.Addon>https://911.lazada.com/helpdesk/tickets/view/</InputGroup.Addon>
                            <FormControl
                                value={this.state.ticketViewNumber}
                                onChange={this.handleChange}
                                type="number"
                            />
                        </InputGroup>
                    </FormGroup>

                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="success"
                        disabled={ false }
                        type="submit"
                        isLoading={ this.state.isLoading }
                        text="Submit"
                        loadingText="Loading..."
                    />
                </form>
                {this.renderUserGuide()}
            </div>
        )
    }

    renderUserGuide() {
        return (
            <div className="Guide">
                <Jumbotron>
                    <h1>User Guide</h1>
                    <div className="GuideBody">
                        <p>Api Key should be in your 911 Portal User profile, top right corner</p>
                        <p> - Source code:
                            <a href="https://gitlab.lzd.co/sluong/911-trello-board">https://gitlab.lzd.co/sluong/911-trello-board</a>
                        </p>
                        <p> - Stack: ReactJS(Client) -> Go(Server) -> FreshService API </p>
                        <p> - Usage: On 2 separate consoles run the following commands
                            <br/>
                            <code>`cd server && go run main.go`</code>
                            <br/>
                            <code> `cd client && yarn start`</code>
                        </p>
                        <p> - Limitation:
                            <br/>Each API key is limited to 1000 requests per hour. <a href="http://api.freshservice.com/#ratelimit">(FreshService)</a>
                            <br/>Each page from 911 Portal will be 1 request.
                            <br/>Default GO API is fetching maximum 30 pages(30 request) of each view (900 tickets) on each page load.
                        </p>
                    </div>
                </Jumbotron>
            </div>
        )
    }

    render() {
        return (
            <div className="BoardBody">
                {!this.state.dataIsLoaded && this.renderPreLoad()}
                {this.state.dataIsLoaded && this.renderBoard()}
            </div>
        )
    }
}

export default withRouter(KanbanBoard);
