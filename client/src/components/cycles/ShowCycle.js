import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSingleCycle, createNewOutcome } from "../../actions/cycleActions";
import { getMeasures } from "../../actions/measureActions";
import { Card, ListGroup, Button, FormControl } from "react-bootstrap";
import Spinner from "../../common/Spinner";
import ShowMeasures from "./ShowMeasures";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
let createOutcome;
class ShowCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOutcome: "",
      showNewOutcome: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getSingleCycle(this.props.match.params.id);
    }
  }

  onClickHandler = e => {
    console.log(e.target.name);
    this.props.getMeasures(e.target.name);
  };

  createNewOutcome = e => {
    this.setState({
      showNewOutcome: true
    });
  };

  saveButtonHandler = e => {
    // e.preventDefault();
    console.log(this.state.newOutcome);
    this.props.createNewOutcome(
      this.props.match.params.id,
      this.state.newOutcome
    );
  };

  render() {
    const { cycle, loading, allCycles } = this.props.cycles;
    let outcomes = "";
    let cycleName = "";
    let measures = "";
    createOutcome = (
      <Card.Footer
        style={{ cursor: "pointer" }}
        onClick={this.createNewOutcome.bind(this)}
      >
        <FontAwesomeIcon icon="plus" />
        &nbsp;&nbsp;&nbsp;Create a new outcome
      </Card.Footer>
    );
    if (loading) {
      outcomes = <Spinner />;
    } else if (cycle === null) {
      outcomes = <h1>CYCLE NOT FOUND</h1>;
    } else {
      cycleName = cycle.Cycle_Name;
      if (Object.keys(cycle).length > 0) {
        outcomes = cycle.data.map(value => (
          <ListGroup.Item
            action
            key={value.Outcome_ID}
            name={value.Outcome_ID}
            onClick={this.onClickHandler}
          >
            {value.Outcome_Name}
          </ListGroup.Item>
        ));
      }
    }

    if (this.props.measures.measure) {
      measures = <ShowMeasures {...this.props.measures.measure} />;
    }

    return (
      <div>
        <h2>{cycleName}</h2>
        <div className="cycle-outcome">
          <div>
            <Card className="text-center cycle">
              <Card.Header>List of Outcomes</Card.Header>

              <ListGroup variant="flush">{outcomes}</ListGroup>
              {this.state.showNewOutcome ? (
                <div>
                  <FormControl
                    name="new-outcome"
                    as="textarea"
                    aria-label="With textarea"
                    value={this.state.newOutcome}
                    placeholder="Enter new Outcome"
                    onChange={e =>
                      this.setState({ newOutcome: e.target.value })
                    }
                  />
                  <Button variant="primary" onClick={this.saveButtonHandler}>
                    Save
                  </Button>
                  &nbsp;
                  <Button
                    variant="primary"
                    onClick={() => this.setState({ showNewOutcome: false })}
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
              {createOutcome}
            </Card>
          </div>
          {measures}
        </div>
      </div>
    );
  }
}

ShowCycle.propTypes = {
  getSingleCycle: PropTypes.func.isRequired,
  getMeasures: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  cycles: state.cycles,
  measures: state.measures
});

export default connect(
  mapStateToProps,
  { getSingleCycle, getMeasures, createNewOutcome }
)(ShowCycle);
