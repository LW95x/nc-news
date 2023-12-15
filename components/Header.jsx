import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { GiNewspaper } from "react-icons/gi";
import { useContext } from 'react';
import { usernameContext } from "../src/context/User";

const Header = () => {
  const { currentUser } = useContext(usernameContext)

  return (
    <div className="header">
      <h1 className="header-text">NC News</h1>
      <div className="nav-container">
      <Navbar bg="dark" expand="lg" data-bs-theme="dark" style={{marginBottom: "0.5rem" }}>
        <Container className="justify-content-center">
            <Navbar.Brand href="/" style={{marginLeft: "4rem"}}><GiNewspaper style={{width: "5rem", height: "auto"}}/></Navbar.Brand>
            <Nav className="align-items-center">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/api/topics">Topics</Nav.Link>
            </Nav>
        </Container>
        <Navbar.Brand style={{fontSize: "100%"}}>User: {currentUser.user.username}</Navbar.Brand>
      </Navbar>
        </div>
    </div>
  );
};

export default Header;
