import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Alert, Modal, ModalFooter, ModalHeader } from "reactstrap";

class SubmitPage extends Component {
  constructor() {
    super();

    this.state = {
      errorAlert: false,
      moralVisible: false,
      formName: "",
      fields: [],
      userInputsNames: [],
      userInputs: [],
      Inputs: [],
      submissions: []
    };
  }

  // get the details of the form by the form-id
  componentDidMount() {
    this.setState({ errorAlert: false });
    const { id } = this.props.match.params;
    fetch(`/api/forms/${id}`)
      .then(res => res.json())
      .then(({ formName, fields, submissions }) => {
        this.setState({
          formName,
          fields,
          submissions: submissions
        });
      });
  }

  isValid() {
    if (this.state.userInputs.length === this.state.fields.length) {
      this.state.userInputs.map(input => {
        //check if the values are empty
        if (input === "") return false;
        return input;
      });
      return true; //no empty values
    }
    return false; //at least one of the inputs not exist
  }

  // update the userInputs of the form
  handleSubmit = () => {
    if (!this.isValid()) {
      this.setState({ errorAlert: true });
    } else {
      this.setState({ errorAlert: false });
      const { id } = this.props.match.params;

      //arrange inputs
      let inputs = [...this.state.userInputsNames];
      inputs = inputs.map(userInputName => ({
        fieldName: userInputName,
        fieldInput: this.state.userInputs[
          this.state.userInputsNames.indexOf(userInputName)
        ]
      }));
      console.log(inputs);
      this.setState({ inputs });
      const submissions = [...this.state.submissions];
      submissions.push({ userInputs: inputs });
      console.log(submissions);

      // update submissions of the form in the db
      fetch(`/api/forms/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          submissions: submissions
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({
            moralVisible: true
          });
        })
        .catch(console.log("could not update the submissions of the form!"));
    }
  };

  handleInputChange = event => {
    //the field name is alredy in the userInputs array
    if (this.state.userInputsNames.includes(event.target.name)) {
      const index = this.state.userInputsNames.indexOf(event.target.name);
      let userInputs = [...this.state.userInputs];
      userInputs[index] = event.target.value;
      this.setState({ userInputs });
    }
    //the field name does not exist
    else {
      const userInputs = [...this.state.userInputs];
      const userInputsNames = [...this.state.userInputsNames];
      userInputsNames.push(event.target.name);
      userInputs.push(event.target.value);
      this.setState({ userInputs, userInputsNames });
    }
  };

  render() {
    return (
      <div class="SubmitPage">
        <h1 className="display-5">{this.state.formName}</h1>
        {this.state.fields.map(field => (
          <div class="form-group">
            <TextField
              label={field.fieldLabel}
              id={field.fieldName}
              name={field.fieldName}
              type={field.fieldType}
              onChange={event => this.handleInputChange(event)}
              margin="normal"
            />
          </div>
        ))}
        <button
          class="btn btn-outline-primary"
          type="submit"
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
        <Link
          to={{
            pathname: "/"
          }}
        >
          <button type="button" class="btn btn-outline-dark m-5">
            Back
          </button>
        </Link>
        <br />

        <Alert color="danger" isOpen={this.state.errorAlert}>
          One of the fields is missing
        </Alert>
        <br />

        <Modal isOpen={this.state.moralVisible}>
          <ModalHeader>Your form was successfully submitted </ModalHeader>
          <ModalFooter>
            <Link
              to={{
                pathname: "/"
              }}
            >
              <buttun>back to my forms</buttun>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SubmitPage;
