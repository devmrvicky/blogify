import React from "react";
import { Container, Logo, AuthorIcon } from "..";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-white h-16 max-[500px]:h-14 flex items-center border-b sticky top-0 z-10">
      <Container className="flex items-center">
        {/* Logo */}
        <Logo
          logoWidth="w-10 max-[500px]:w-8"
          logoText="text-3xl max-[500px]:text-xl"
        />
        {/* Nav links */}
        <Nav />
        {/* user icon */}
        <AuthorIcon />
      </Container>
    </header>
  );
};

export default Header;
