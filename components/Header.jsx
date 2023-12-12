import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { GiNewspaper } from "react-icons/gi";

const Header = () => {
  return (
    <div id="header">
      <h1 className="header-text">NC News</h1>
      <Navbar bg="dark" data-bs-theme="dark" style={{marginBottom: "2rem"}}>
        <Container className="nav-container">
        <Navbar.Brand href="">Topic</Navbar.Brand>
            <Navbar.Brand href="/" style={{marginLeft: "26rem"}}><GiNewspaper size={80}/></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#topics">Topics</Nav.Link>
                <Nav.Link href="#articles">Articles</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
