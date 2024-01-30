import React, { Component } from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar>
        <div className="container">
          <NavbarBrand tag={Link} to="/" className="mx-auto" style={{ fontSize: '35px', color: '#000080' }}><div className='header-logo'>Shortener URL</div></NavbarBrand>
          </div>
        </Navbar>
      </header>
    );
  }
}
