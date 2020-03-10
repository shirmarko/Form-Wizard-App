import React, { Component } from "react";
import Field from "./Field";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class AddFormPage extends Component {
  constructor() {
    super();
    this.state = {
      moralVisible: false,
      alertVisable: false,
      fields: [],
      field: {},
      formName: "",
      name: "",
      label: "",
      type: ""
    };
  }

  handleAddFeild = field => {
    this.setState({
      field,
      fields: [...this.state.fields, field]
    });
  };

  handleSave = () => {
    if (this.state.formName === "" || this.state.fields === []) {
      this.setState({ alertVisable: true });
    } else {
      this.setState({ alertVisable: false });

      fetch("/api/forms", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formName: this.state.formName,
          fields: this.state.fields
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({ moralVisible: true });
        })
        .catch();
    }
  };

  render() {
    return (
      <div className="content">
        <form>
          <TextField
            id="standard-basic"
            label="Form Name"
            name="formName"
            fullWidth
            helperText="Please entet your form name"
            onChange={e =>
              this.setState({
                formName: e.target.value
              })
            }
          />
          <hr />
          <div>
            <form>
              {this.state.fields.map(field => (
                <div class="form-group">
                  <TextField
                    label={field.fieldLabel}
                    id={field.fieldName}
                    name={field.fieldName}
                    type={field.fieldType}
                    margin="normal"
                  />
                </div>
              ))}
            </form>
          </div>
          <hr />

          <Field add={field => this.handleAddFeild(field)} />
          <br />

          <Alert color="danger" isOpen={this.state.alertVisable}>
            Form name or field are missing
          </Alert>
          <br />

          <button
            type="button"
            class="btn btn-success m-5"
            onClick={this.handleSave}
          >
            Save
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
        </form>
        <br />
        <Modal isOpen={this.state.moralVisible}>
          <ModalHeader>
            {this.state.formName} Form Added Successfully
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Link
              to={{
                pathname: "/"
              }}
            >
              <buttun>Back to my forms</buttun>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddFormPage;
