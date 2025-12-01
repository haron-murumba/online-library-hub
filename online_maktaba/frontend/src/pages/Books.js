import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, 
  Spinner, Alert, Badge 
} from 'react-bootstrap';
import { bookService } from '../services/bookService';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    subject: '',
    search: ''
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks(filters);
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories/');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const handleDownload = async (bookId, fileUrl) => {
    try {
      await bookService.incrementDownloads(bookId);
      window.open(`http://localhost:8000${fileUrl}`, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading books...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">📚 Library Books</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filters */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleFilterSubmit}>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    name="category" 
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>School Level</Form.Label>
                  <Form.Select 
                    name="level" 
                    value={filters.level}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Levels</option>
                    <option value="primary">Primary School</option>
                    <option value="secondary">Secondary School</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    placeholder="e.g., Mathematics"
                    value={filters.subject}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Search</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="search" 
                    placeholder="Search books..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end">
              <Button 
                type="submit" 
                variant="primary"
                className="me-2"
              >
                Apply Filters
              </Button>
              <Button 
                type="button" 
                variant="outline-secondary"
                onClick={() => {
                  setFilters({ category: '', level: '', subject: '', search: '' });
                  fetchBooks();
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Books Grid */}
      <Row>
        {books.length === 0 ? (
          <Col>
            <Alert variant="info">
              No books found. Try different filters or check back later.
            </Alert>
          </Col>
        ) : (
          books.map(book => (
            <Col key={book.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm">
                {book.cover_image && (
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:8000${book.cover_image}`}
                    alt={book.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title className="text-truncate">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By {book.author}
                  </Card.Subtitle>
                  
                  <div className="mb-3">
                    <Badge bg="primary" className="me-2">{book.category_name}</Badge>
                    <Badge bg={book.level === 'primary' ? 'success' : 'info'}>
                      {book.level === 'primary' ? 'Primary' : 'Secondary'}
                    </Badge>
                    <Badge bg="secondary" className="ms-2">{book.subject}</Badge>
                  </div>
                  
                  <Card.Text className="text-truncate">
                    {book.description}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      as={Link}
                      to={`/books/${book.id}`}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleDownload(book.id, book.file)}
                    >
                      Download ({book.downloads})
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <small>
                    📊 {book.views} views • 📅 {new Date(book.upload_date).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Books;