import React from "react";
import { Container, Logo, AuthorIcon } from "..";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-white h-16 flex items-center border-b">
      <Container className="flex items-center">
        {/* Logo */}
        <Logo />
        {/* Nav links */}
        <Nav />
        {/* user icon */}
        <AuthorIcon />
      </Container>
    </header>
  );
};

export default Header;
