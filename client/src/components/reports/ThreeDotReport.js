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

export default function ThreeDotReport(props) {
  return (
    <Dropdown className="dropdown three-dots" alignRight>
      <Dropdown.Toggle id="dropdown-custom-components" as={CustomToggle}>
        <FontAwesomeIcon icon="ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link
          to={`/dashboard/reports/cycle/${props.Cycle_ID}`}
          className="dropdown-item"
        >
          Generate Report
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}
