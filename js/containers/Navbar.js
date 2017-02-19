import React from 'react'
import {Link} from 'react-router'
import { Navbar, NavItem, NavDropdown, Nav, MenuItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {login,logout} from '../actionCreators/actions'

class _NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.goToPageAdd = this.goToPageAdd.bind(this)
    this.goToPageList = this.goToPageList.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  goToPageList(event) {
    event.preventDefault()
    this.context.router.transitionTo('/')
  }
  goToPageAdd(event) {
    event.preventDefault()
    this.context.router.transitionTo('/create')
  }
  handleLogout(event) {
    event.preventDefault()
    localStorage.clear()
    this.props.logout()
  }
  render() {
    let bookNav
    let addNav
    let authButton
    if (window.location.pathname=='/') {
      bookNav = <NavItem href='#' onClick={this.goToPageList}  active> Books</NavItem>
    } else {
      bookNav = <NavItem href='#' onClick={this.goToPageList} >Books</NavItem>
    }
    if(window.location.pathname=='/create') {
      addNav = <NavItem href='#' onClick={this.goToPageAdd} active >Add New Book</NavItem>
    } else {
      addNav = <NavItem href='#' onClick={this.goToPageAdd}>Add New Book</NavItem>
    }
    if(!this.props.auth) {
      authButton = <a href='http://localhost:9123/oauth/authenticate/facebook'><Button className='fbLogin' bsStyle='info'>Login with <strong>Facebook</strong></Button></a>
    } else {
      authButton = <Button onClick={this.handleLogout} className='fbLogin' bsStyle='danger'><strong>Logout</strong></Button>
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
          <Nav pullRight>
            {authButton}
          </Nav> 
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const {object} = React.PropTypes

_NavBar.contextTypes = {
    router: object
}

const mapActionsToProps = (dispatch) => ({
  logout() {
    dispatch(logout())
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})

const {func } = React.PropTypes

_NavBar.propTypes = {
  logout: func,
  auth: object
}

const NavBar = connect(mapStateToProps, mapActionsToProps)(_NavBar)
export default NavBar
