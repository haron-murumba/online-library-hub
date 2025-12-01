import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaGraduationCap, FaSearch, FaUpload } from 'react-icons/fa';

function Home() {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col md={8} className="mx-auto text-center">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to Online Maktaba 📚
          </h1>
          <p className="lead mb-4">
            A digital library for primary and secondary school students. 
            Access textbooks, study resources, past papers, and more!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/books" variant="primary" size="lg">
              <FaBook className="me-2" /> Browse Books
            </Button>
            <Button as={Link} to="/register" variant="outline-primary" size="lg">
              Join Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Features */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm">
            <Card.Body>
              <div className="mb-3">
                <FaBook size={50} className="text-primary" />
              </div>
              <Card.Title>Digital Books</Card.Title>
              <Card.Text>
                Access thousands of textbooks and reference materials for all subjects.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm">
            <Card.Body>
              <div className="mb-3">
                <FaGraduationCap size={50} className="text-success" />
              </div>
              <Card.Title>Study Resources</Card.Title>
              <Card.Text>
                Worksheets, past papers, study notes, and video lessons.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm">
            <Card.Body>
              <div className="mb-3">
                <FaUpload size={50} className="text-warning" />
              </div>
              <Card.Title>Contribute</Card.Title>
              <Card.Text>
                Share your study materials and help other students learn.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mt-5 pt-5">
        <Col className="text-center">
          <h3 className="mb-4">Start Learning Today!</h3>
          <p className="text-muted">
            Join thousands of students who are already using Online Maktaba
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;