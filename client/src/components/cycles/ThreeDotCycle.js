import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
library.add(faEllipsisV);

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick} className="edit-cycle">
        {this.props.children}
      </a>
    );
  }
}

export default function ThreeDotCycle(props) {
  return (
    <Dropdown className="dropdown three-dots" alignRight>
      <Dropdown.Toggle id="dropdown-custom-components" as={CustomToggle}>
        <FontAwesomeIcon icon="ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.type === "Outcome" && props.Is_Submitted === "false" ? (
          <Dropdown.Item onClick={props.editHandler}>
            Edit {props.type}
          </Dropdown.Item>
        ) : null}

        {props.type === "Measure" && props.Is_Submitted === "false" ? (
          <Dropdown.Item onClick={props.editHandler}>
            Edit {props.type}
          </Dropdown.Item>
        ) : null}

        {props.type === "Cycle" ? (
          <Dropdown.Item onClick={props.editHandler}>
            Edit {props.type}
          </Dropdown.Item>
        ) : null}

        {props.type === "Cycle" ? (
          <Link
            to={`/dashboard/reports/cycle/${props.Cycle_ID}`}
            className="dropdown-item"
          >
            Generate Report
          </Link>
        ) : null}
        {props.type === "Cycle" ? (
          <Dropdown.Item onClick={props.submitCycleHandler}>
            Submit Cycle
          </Dropdown.Item>
        ) : null}
        {props.type === "Outcome" ? (
          <Link
            to={`/dashboard/reports/outcome/${props.Outcome_ID}`}
            className="dropdown-item"
          >
            Generate Report
          </Link>
        ) : null}
        {props.type === "Measure" && props.Measure_type === "rubric" ? (
          <Link
            to={"/dashboard/reports/rubricMeasure/" + props.Measure_ID}
            className="dropdown-item"
          >
            Generate Report
          </Link>
        ) : null}

        {props.type === "Measure" && props.Measure_type === "test" ? (
          <Link
            to={"/dashboard/reports/testMeasure/" + props.Measure_ID}
            className="dropdown-item"
          >
            Generate Report
          </Link>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
}
