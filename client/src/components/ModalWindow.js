import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class ModalWindow extends Component {
  state = {};
  Delete = () => {
    //delete form from the db
    fetch(`/api/forms/${this.props.form._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.props.inClose();
        console.log(res);
      });
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader> Delete</ModalHeader>
        <ModalBody>
          Are you sure you what to Delete '{this.props.form.formName}' form?
        </ModalBody>
        <ModalFooter>
          <buttun
            type="button"
            class="btn btn-secondary"
            onClick={this.props.inClose}
          >
            No
          </buttun>

          <buttun type="button" class="btn btn-secondary" onClick={this.Delete}>
            Yes
          </buttun>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalWindow;
