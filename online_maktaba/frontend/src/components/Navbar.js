import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

function NavigationBar() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          📚 Online Maktaba
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">🏠 Home</Nav.Link>
            <Nav.Link as={Link} to="/books">📖 Books</Nav.Link>
            <Nav.Link as={Link} to="/study-resources">📚 Study Resources</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/upload">⬆️ Upload</Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3 text-light">
                  👤 Welcome, <strong>{user?.username}</strong>!
                </Navbar.Text>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="me-2"
                >
                  Logout
                </Button>
                <Button 
                  variant="light" 
                  as={Link} 
                  to="/profile"
                >
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  as={Link} 
                  to="/login" 
                  className="me-2"
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;