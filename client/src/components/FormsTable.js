import React, { Component } from "react";
import { Link } from "react-router-dom";
import ModalWindow from "./ModalWindow";

class FormTable extends Component {
  constructor() {
    super();
    this.state = {
      moralDelete: false,
      currForm: {},
      forms: []
    };
  }

  componentDidMount = () => {
    fetch("/api/login")
      .then(res => res.json())
      .then(forms =>
        this.setState({ forms }, () =>
          console.log("recieved forms data!", forms)
        )
      );
  };

  render() {
    return (
      <div>
        <h1 className="display-5">My Forms</h1>
        <table class="table" width="100%" id="team-list">
          <thead>
            <tr>
              <th scope="col">Form Id</th>
              <th scope="col">Form Name</th>
              <th scope="col">#Submissions</th>
              <th scope="col">Submit Page</th>
              <th scope="col">Submissions Page</th>
              <th scope="col">Delete Form</th>
            </tr>
          </thead>
          <tbody>
            {this.state.forms.map(form => (
              <tr>
                <th scope="row">{this.state.forms.indexOf(form) + 1}</th>
                <td>{form.formName}</td>
                <td>{form.submissions.length}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/SubmitPage/${form._id}`
                    }}
                  >
                    Click to submit
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/SubmissionsPage/${form._id}`
                    }}
                  >
                    Submissions page
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    value={form}
                    onClick={() =>
                      this.setState({ moralDelete: true, currForm: form })
                    }
                  >
                    x
                  </button>
                  <ModalWindow
                    isOpen={this.state.moralDelete}
                    form={this.state.currForm}
                    inClose={() => {
                      this.setState({ moralDelete: false });
                      this.componentDidMount();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          to={{
            pathname: "/AddForm"
          }}
        >
          <button type="button" class="btn btn-success ">
            Add Form
          </button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

export default FormTable;
