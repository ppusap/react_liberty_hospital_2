import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import "./header.scss";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <Navbar dark expand="md">
        <NavbarBrand href="/">
          <img
            src="https://libertyhospitalfoundation.org/wp-content/uploads/2018/04/FinalAsset-1.png"
            alt=""
          />
