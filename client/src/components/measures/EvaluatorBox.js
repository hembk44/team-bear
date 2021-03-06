import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";
import { Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheck,
  faUserCheck,
  faUserTimes
} from "@fortawesome/free-solid-svg-icons";
library.add(faTimesCircle, faCheck, faUserCheck, faUserTimes);

class EvaluatorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Evaluator: ""
    };
  }
  addEvaluator = () => {
    this.props.addButtonEvaluator(this.state.Evaluator);
  };

  evaluatorBoxClickHandler = () => {
    this.props.getUnevaluatedStudents(this.props.Evaluator_Name);
  };

  removeEvaluatorMeasureButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "The evalutor's scores will be removed until he's added back!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then(result => {
      if (result.value) {
        this.props.removeEvaluatorMeasure(
          this.props.cycleID,
          this.props.outcomeID,
          this.props.Measure_ID,
          this.props.Evaluator_Email
        );
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  render() {
    let { Evaluator_Name, Evaluator_Email } = this.props;
    let content = "";
    if (
      !isEmpty(this.props.Evaluator_Name) ||
      !isEmpty(this.props.Evaluator_Email)
    ) {
      content = (
        <div className="singleEvaluator">
          {this.props.Is_Submitted === "true" ? null : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Remove Evaluator</Tooltip>}
            >
              <FontAwesomeIcon
                icon="times-circle"
                className="crossIcon"
                onClick={this.removeEvaluatorMeasureButton}
              />
            </OverlayTrigger>
          )}

          <div
            style={{ paddingRight: "30px" }}
            onClick={this.evaluatorBoxClickHandler}
          >
            <div>
              {Evaluator_Name}
              &nbsp;&nbsp;
              {this.props.hasSubmitted === "true" ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Evaluation Submitted</Tooltip>}
                >
                  <FontAwesomeIcon
                    icon="user-check"
                    className="completed-evaluation"
                    // onClick={this.removeEvaluatorMeasureButton}
                  />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Pending Evaluation</Tooltip>}
                >
                  <FontAwesomeIcon
                    icon="user-times"
                    className="pending-evaluation"
                    // onClick={this.removeEvaluatorMeasureButton}
                  />
                </OverlayTrigger>
              )}
            </div>
            <div>{Evaluator_Email}</div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="singleEvaluator">
          <Form onSubmit={this.addEvaluator}>
            <OverlayTrigger
              key="c"
              placement="top"
              overlay={<Tooltip id="tooltip-top">Cancel</Tooltip>}
            >
              <FontAwesomeIcon
                icon="times-circle"
                className="crossIcon"
                onClick={this.props.addEvaluator}
              />
            </OverlayTrigger>
            <OverlayTrigger
              key="e"
              placement="top"
              overlay={<Tooltip id="tooltip-top">Add Evaluator</Tooltip>}
            >
              <FontAwesomeIcon
                icon="check"
                className="checkIcon"
                onClick={this.addEvaluator}
              />
            </OverlayTrigger>
            <div style={{ paddingRight: "30px" }}>
              <Form.Group
                controlId="formBasicEmail"
                style={{ margin: "0px 0px 0px 10px" }}
              >
                <Form.Label>Select Evaluator:</Form.Label>
                <Form.Control
                  name="Evaluator"
                  as="select"
                  value={this.state.Evaluator}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Choose one:
                  </option>
                  {!isEmpty(this.props.values) ? (
                    this.props.values.map((item, index) => (
                      <option value={item.Email} key={index}>
                        {item.Name}
                        {" ("}
                        {item.Email}
                        {")"}
                      </option>
                    ))
                  ) : (
                    <option value="">No Evaluators yet</option>
                  )}
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </div>
      );
    }
    return <>{content}</>;
  }
}

export default EvaluatorBox;
