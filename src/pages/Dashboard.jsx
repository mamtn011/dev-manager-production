import React from "react";
import { Row, ListGroup, Col } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
export default function Dashboard() {
  return (
    <>
      <h3 className="text-center p-3">Dashboard</h3>
      <Row>
        <Col sm="3" className="text-center">
          <ListGroup>
            <ListGroup.Item as={NavLink} to="user-profile" className="nav-link">
              Created Profiles
            </ListGroup.Item>

            <ListGroup.Item
              as={NavLink}
              to="manage-password"
              className="nav-link"
            >
              Manage Password
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col sm="9">
          <ListGroup>
            <ListGroup.Item className="dash-content">
              <Outlet />
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
