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
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="nav-options">
          <Nav navbar>
            <NavbarText>Home</NavbarText>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Scholarship
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/scholarship">New Application</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/scholarship/applications">
                    Review Applications
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/scholarship/status">Check Status</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>  
