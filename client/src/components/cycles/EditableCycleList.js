import React, { Component } from "react";
import {
  Form,
  ListGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import ThreeDotCycle from "./ThreeDotCycle";
library.add(faPlus, faEdit);

class Editable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      Cycle_Name: this.props.value.Cycle_Name
    };
  }

  editHandler = e => {
    let { isEditable } = this.state;
    this.setState({
      isEditable: !isEditable
    });
  };

  cancelButtonHandler = e => {
    this.setState({
      Cycle_Name: this.props.value.Cycle_Name,
      isEditable: false
    });
  };
  deleteHandler = e => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.deleteCycle(this.props.value.Cycle_ID);
        this.editHandler();
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  updateButtonHandler = e => {
    this.props.updateCycleName(
      this.props.value.Cycle_ID,
      this.state.Cycle_Name
    );
  };
  submitCycleHandler = e => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!"
    }).then(result => {
      if (result.value) {
        this.props.submitCycle(this.props.value.Cycle_ID);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  render() {
    let { isEditable } = this.state;

    return (
      <>
        {isEditable ? (
          <Form>
            <Form.Control
              type="text"
              value={this.state.Cycle_Name}
              className="mt-1 ml-1 mr-1"
              onChange={e => this.setState({ Cycle_Name: e.target.value })}
            />

            <ButtonGroup size="sm" className="mt-1 mb-1">
              <Button variant="primary" onClick={this.updateButtonHandler}>
                Update
              </Button>
              <Button variant="secondary" onClick={this.cancelButtonHandler}>
                Cancel
              </Button>
              <Button variant="outline-danger" onClick={this.deleteHandler}>
                Delete
              </Button>
            </ButtonGroup>
          </Form>
        ) : (
          <ListGroup key={this.props.value.Cycle_ID} className="edit-post">
            <Link
              to={"/dashboard/cycles/" + this.props.value.Cycle_ID}
              style={{ flexGrow: "1" }}
            >
              <ListGroup.Item action key={this.props.value.Cycle_ID}>
                {this.props.value.Cycle_Name}
              </ListGroup.Item>
            </Link>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Options</Tooltip>}
            >
              <div
                style={{
                  display: "flex",
                  alignSelf: "center",
                  cursor: "pointer"
                }}
              >
                <ThreeDotCycle
                  editHandler={this.editHandler}
                  type="Cycle"
                  Cycle_ID={this.props.value.Cycle_ID}
                  submitCycleHandler={this.submitCycleHandler}
                />
              </div>
            </OverlayTrigger>
          </ListGroup>
        )}
      </>
    );
  }
}

export default Editable;
