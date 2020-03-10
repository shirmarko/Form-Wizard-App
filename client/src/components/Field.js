import React, { Component } from "react";
import { Alert } from "reactstrap";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisable: false,
      name: "",
      label: "",
      type: "text"
    };
  }

  componentDidMount() {
    this.setState({
      alertVisable: false,
      name: "",
      label: "",
      type: "text"
    });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({ alertVisable: true });
    } else {
      this.props.add({
        fieldName: this.state.name,
        fieldType: this.state.type,
        fieldLabel: this.state.label
      });
      this.setState({
        alertVisable: false,
        name: "",
        label: "",
        type: "text"
      });
    }
  };

  render() {
    return (
      <div>
        <label for="fieldDeitails">
          <th>Enter New Field Deitails:</th>
        </label>
        <div class="row">
          <div class="col">
            <input
              key="name"
              type="text"
              class="form-control"
              name="name"
              placeholder="entar field name"
              onChange={e => this.handleChange(e)}
              value={this.state.name}
            />
          </div>
          <div class="col">
            <select
              class="form-control "
              name="type"
              placeholder="select field type"
              onChange={e => this.handleChange(e)}
              value={this.state.type}
            >
              <option value="text">text</option>
              <option value="color">color</option>
              <option value="data">date</option>
              <option value="email">email</option>
              <option value="tel">tel</option>
              <option value="number">number</option>
            </select>
          </div>
          <div class="col">
            <input
              key="label"
              type="text"
              class="form-control"
              name="label"
              placeholder="enter feilds label"
              onChange={e => this.handleChange(e)}
              value={this.state.label}
            />
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-primary "
              onClick={e => this.handleSubmit(e)}
            >
              Add Field
            </button>
          </div>
        </div>
        <br />

        <Alert color="danger" isOpen={this.state.alertVisable}>
          FIELD NAME IS REQUIRED!
        </Alert>
      </div>
    );
  }
}

export default Field;
