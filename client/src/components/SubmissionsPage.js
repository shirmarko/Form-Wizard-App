import React, { Component } from "react";
import { Link } from "react-router-dom";

class SubmissionsPage extends Component {
  constructor() {
    super();
    this.state = {
      formName: "",
      fields: [],
      submissions: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`/api/forms/${id}`)
      .then(res => res.json())
      .then(({ formName, fields, submissions }) => {
        this.setState({
          formName,
          fields,
          submissions
        });
      });
  }

  handleSubmission = userInputs => {
    const inputsByOrder = [];
    let orderFields = this.state.fields;
    orderFields = orderFields.map(field => field.fieldName);
    userInputs.map(userInput => {
      inputsByOrder[orderFields.indexOf(userInput.fieldName)] =
        userInput.fieldInput;
      return userInput;
    });

    return (
      <tr>
        {inputsByOrder.map(input => (
          <td>{input}</td>
        ))}
      </tr>
    );
  };

  render() {
    return (
      <div>
        <h1 className="display-5"> Submissions Page: {this.state.formName}</h1>
        <table class="table" width="100%" id="team-list">
          <thead>
            <tr>
              {this.state.fields.map(field => (
                <th scope="col">{field.fieldName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.submissions.map(submission =>
              this.handleSubmission(submission.userInputs)
            )}
          </tbody>
        </table>
        <Link
          to={{
            pathname: "/"
          }}
        >
          <button type="button" class="btn btn-outline-dark ">
            Back
          </button>
        </Link>
      </div>
    );
  }
}

export default SubmissionsPage;
