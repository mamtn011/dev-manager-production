import { useContext, useState } from "react";
import { Navbar, Nav, Form, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";

export default function Header() {
  const [searchInput, setSearchInput] = useState(null);
  const { logout, user } = useContext(AuthContext);
  const { setSearchText } = useContext(ProfileContext);
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(searchInput);
    e.target.children[0].value = "";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-brand">
          Dev Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {user && (
              <>
                <Nav.Link as={NavLink} to="dashboard/user-profile">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="all-profiles">
                  Profiles
                </Nav.Link>
                <Nav.Link as={NavLink} to="add-new">
                  Add Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/upload">
                  Upload
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
