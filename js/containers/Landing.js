import React from 'react'
import {Grid, Row, Col, PageHeader, Pagination} from 'react-bootstrap'
import Navbar from './Navbar'
import Book from './Book'
import axios from 'axios'
import {connect} from 'react-redux'
import {login,logout} from '../actionCreators/actions'


class _Landing extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      books: [],
      page: 1,
      pages: 3
    }
  }
  handleSelect(eventKey) {
    axios.get(`http://localhost:9123/api/book?max=5&offset=${5*(eventKey-1)}`)
         .then(res => {
           let books = res.data
           this.setState({
               'page': eventKey,
               'books': books
           })
         })
    this.setState({
      page: eventKey
    })
  }
  componentDidMount() {
    if(localStorage.token) {
      this.props.login()
    }
    axios.get(`http://localhost:9123/api/book?max=5&offset=0`)
         .then(res => {
           let books = this.state.books.concat(res.data)
           this.setState({ books })
         })
    axios.get(`http://localhost:9123/api/pages`)
      .then(res => {
        let pages = Math.max(res.data[0]/5,3);
        this.setState({
          pages
        })
      })
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className='grid'>
          <Grid>
            <Row className='show-grid'>
              <Col xs={12} md={8} mdOffset={2}>
                {this.state.books.map((book) => {
                  return (
                    <Book key={book.id} auth={this.props.auth} logout={this.props.logout} {...book} />
                  )
                })}
              </Col>
            </Row>
          </Grid>
        </div>
        <div className='center'>
          <Pagination bsSize='large' items={this.state.pages} activePage={this.state.page} onSelect={this.handleSelect} prev next first last ellipsis boundaryLinks maxButtons={5} />
        </div>
      </div>
    )
  }
}

const mapActionsToProps = (dispatch) => ({
  login() {
    dispatch(login())
  },
  logout() {
    dispatch(logout())
  }
})

const mapStateToProps = (state) => ({
  auth: state.auth
})

const {func, object } = React.PropTypes

_Landing.propTypes = {
  login: func,
  logout: func,
  auth: object
}

const Landing = connect(mapStateToProps, mapActionsToProps)(_Landing)
export default Landing
