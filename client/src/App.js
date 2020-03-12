import React, { Component } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  Col
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormsTable from "./components/FormsTable";
import SubmitPage from "./components/SubmitPage";
import SubmissionsPage from "./components/SubmissionsPage";
import AddFormPage from "./components/AddFormPage";
import LoginWindow from "./components/loginWindow";
// import CallBack from "./components/auth0_callback";

class App extends Component {
  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">MyFormBuilder</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MY FORM BUILDER APP</h1>
            </Jumbotron>
          </Col>
        </Row>

        <Router>
          <Switch>
            <Route exact path="/" component={LoginWindow} />
            {/* <Route exact path="/auth0_callback" component={CallBack} /> */}
            <Route exact path="/home" component={FormsTable} />
            <Route path="/SubmitPage/:id" component={SubmitPage} />
            <Route path="/SubmissionsPage/:id" component={SubmissionsPage} />
            <Route path="/AddForm" component={AddFormPage} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
