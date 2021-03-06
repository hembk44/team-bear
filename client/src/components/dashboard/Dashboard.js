import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
import SideBar from "./SideBar";
import NavBar from "../layouts/NavBar";
import "../../App.css";

import DashboardContents from "./DashboardContents";
import Rubrics from "../rubrics/Rubrics";
import Tasks from "../tasks/Tasks";
import CreateRubric from "../rubrics/CreateRubric";
import ShowRubric from "../rubrics/ShowRubric";
import ViewRubric from "../tasks/ViewRubric";
import ViewTest from "../tasks/ViewTest";
import Evaluators from "../evaluators/Evaluators";
import ReportContents from "../reports/ReportContents";
import AdminTools from "../admin/AdminTools";
import Program from "../admin/Program";
import ViewLogs from "./ViewLogs";
import Faqs from "../faqs/Faqs";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }

    if (this.props.errors !== prevProps.errors) {
      // console.log(this.props.errors);
      this.setState({ errors: this.props.errors });
    }
  };

  render() {
    return (
      <div id="outer-container">
        <SideBar auth={this.props.auth} />
        <main id="page-wrap">
          <Route path={"/dashboard"} component={NavBar} />
          <Container>
            <div className="special-container">
              <Route path="/dashboard" component={DashboardContents} />
              <Route exact path="/dashboard/rubrics" component={Rubrics} />
              <Route exact path="/dashboard/tasks" component={Tasks} />
              <Route exact path="/dashboard/logs" component={ViewLogs} />
              <Route
                exact
                path="/dashboard/evaluators"
                component={Evaluators}
              />
              <Route exact path="/dashboard/faqs" component={Faqs} />
              <Route
                exact
                path="/dashboard/rubrics/create"
                component={CreateRubric}
              />
              <Route
                exact
                path="/dashboard/rubrics/:id(\d+)"
                component={ShowRubric}
              />
              <Route exact path="/dashboard/programs" component={AdminTools} />
              <Route
                exact
                path="/dashboard/programs/:programID(\d+)"
                component={Program}
              />
            </div>
          </Container>
          <div style={{ margin: "0px 5vw" }}>
            <Route path="/dashboard/reports" component={ReportContents} />

            <Route
              exact
              path="/dashboard/tasks/rubric/:rubricMeasureId(\d+)"
              component={ViewRubric}
            />
            <Route
              exact
              path="/dashboard/tasks/test/:testMeasureId(\d+)"
              component={ViewTest}
            />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, logoutUser }
)(Dashboard);
