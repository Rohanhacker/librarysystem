import React from 'react'
import {Grid, Row, Col, PageHeader, Pagination} from 'react-bootstrap'
import Navbar from './Navbar'
import Book from './Book'
import axios from 'axios'

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      books: [],
      page: 1
    }
  }
  handleSelect(eventKey) {
    axios.get(`http://localhost:9123/Book?max=5&offset=${5*(eventKey-1)}`)
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
    axios.get(`http://localhost:9123/Book?max=5&offset=0`)
         .then(res => {
           let books = this.state.books.concat(res.data)
           this.setState({ books })
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
                    <Book key={book.id} {...book} />
                  )
                })}
              </Col>
            </Row>
          </Grid>
        </div>
        <div className='center'>
          <Pagination bsSize='large' items={10} activePage={this.state.page} onSelect={this.handleSelect} />
        </div>
      </div>
    )
  }
}


export default Landing
