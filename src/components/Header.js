import * as React from "react";
import logo from "../assets/anime logo.png";


export const Header = ({ data }) => {

  return (
    <header className="header">
      <img src={logo} alt="logo" />
    </header>
  );
};
