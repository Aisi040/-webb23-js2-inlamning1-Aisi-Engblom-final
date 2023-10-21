import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Navbar, Nav, Container, Card, Button, Badge } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';


const initialProducts = [
  {id: 1, name: 'Produkt 1', price: 100, imgSrc: 'path/to/image1.jpg', stock: 10},
  {id: 2, name: 'Produkt 2', price: 150, imgSrc: 'path/to/image2.jpg', stock: 5},
  {id: 3, name: 'Produkt 2', price: 150, imgSrc: 'path/to/image2.jpg', stock: 5},
  {id: 4, name: 'Produkt 2', price: 150, imgSrc: 'path/to/image2.jpg', stock: 5},
  {id: 5, name: 'Produkt 2', price: 150, imgSrc: 'path/to/image2.jpg', stock: 5},
  {id: 6, name: 'Produkt 2', price: 150, imgSrc: 'path/to/image2.jpg', stock: 5},
  // ... (lägg till fler produkter om du vill)
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productToAdd) => {
    const updatedProducts = products.map(product =>
      product.id === productToAdd.id
        ? { ...product, stock: product.stock - 1 }
        : product
    );

    setProducts(updatedProducts);
    setCart([...cart, productToAdd]);
  };

  return (
    <div>
      <Navbar style={{backgroundColor: '#A67C52'}}>
        <Container>
          <Navbar.Brand href="#home">VED</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Hem</Nav.Link>
            <Nav.Link href="#features">Produkter</Nav.Link>
            <Nav.Link href="#pricing">Kontakta oss</Nav.Link>
          </Nav>

          {showSearch && 
            <input 
              type="text" 
              placeholder="Sök produkter..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ marginRight: '10px' }}
            />
          }

          <i className="bi bi-search" onClick={() => setShowSearch(!showSearch)} style={{color: 'black', cursor: 'pointer', marginRight: '10px'}}></i>
          <i className="bi bi-cart" style={{color: 'black', marginRight: '5px'}}></i>
          {cart.length > 0 && <Badge bg="secondary">{cart.length}</Badge>}
        </Container>
      </Navbar>

      <Container className="mt-4">
        <div className="row">
          {filteredProducts.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imgSrc} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Pris: {product.price} SEK</Card.Text>
                  <Card.Text>Lagersaldo: {product.stock} st kvar</Card.Text>
                  <Button 
                    variant="primary" 
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock > 0 ? "Lägg till i kundvagn" : "Slutsåld"}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <footer className="mt-4 bg-dark text-white text-center py-3">
        © 2023 Webbshop. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}

export default App;