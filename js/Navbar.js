import React from 'react'
import {Link} from 'react-router'
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap'
class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.goToPageAdd = this.goToPageAdd.bind(this)
    this.goToPageList = this.goToPageList.bind(this)
  }
  goToPageList(event) {
    event.preventDefault()
    this.context.router.transitionTo('/')
  }
  goToPageAdd(event) {
    event.preventDefault()
    this.context.router.transitionTo('/create')
  }
  render() {
    let bookNav
    let addNav
    if (window.location.pathname=='/') {
      bookNav = <NavItem href='#' onClick={this.goToPageList}  active> Books</NavItem>
    } else {
      bookNav = <NavItem href='#' onClick={this.goToPageList} >Books</NavItem>
    }
    if(window.location.pathname=='/add') {
      addNav = <NavItem href='#' onClick={this.goToPageAdd} active >Add New Book</NavItem>
    } else {
      addNav = <NavItem href='#' onClick={this.goToPageAdd}>Add New Book</NavItem>
    }
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/yahoo' >Library Management </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {bookNav}
            {addNav}
          </Nav>
          {/* <Nav pullRight>
            <NavItem href='#'>Link Right</NavItem>
            <NavItem href='#'>Link Right</NavItem>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const {object} = React.PropTypes

NavBar.contextTypes = {
    router: object
}

export default NavBar
