import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { GiNewspaper } from "react-icons/gi";
import { useContext } from 'react';
import { usernameContext } from "../src/context/User";

const Header = () => {
  const { currentUser } = useContext(usernameContext)
  return (
    <div id="header">
      <h1 className="header-text">NC News</h1>
      <Navbar bg="dark" data-bs-theme="dark" style={{marginBottom: "2rem"}}>
        <Navbar.Brand style={{paddingLeft: "5rem"}}>Topic</Navbar.Brand>
        <Container>
            <Navbar.Brand href="/" style={{marginLeft: "26rem"}}><GiNewspaper size={80}/></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#topics">Topics</Nav.Link>
                <Nav.Link href="#articles">Articles</Nav.Link>
            </Nav>
        <Navbar.Brand>User: {currentUser.user.username}</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
