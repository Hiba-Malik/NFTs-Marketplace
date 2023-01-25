import { Link } from 'react-router-dom';

import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './css/Navbar.css';

const Navigation = ({ account, connectWallet }) => {
  // update the custom property for the root element and have it cascade on the header as well

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="brand" href="#home">
          <Nav.Link as={Link} to="/">
            DApp-Marketplace
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/create-multiple">
              Create Multiple
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listed-items">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/my-purchases">
              My Purchases
            </Nav.Link>
          </Nav>
          <Nav>
            {account != null ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button className="btn">
                  {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button className="btn" onClick={() => connectWallet(0)}>
                Connect
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
