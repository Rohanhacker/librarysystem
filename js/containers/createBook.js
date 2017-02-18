import React from 'react'
import {Grid, Row, Col, Button, PageHeader, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Alert} from 'react-bootstrap'
import Navbar from './Navbar'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'

class createBook extends React.Component {
  constructor(props) {
    super(props)
    this.validateIsbn = this.validateIsbn.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handlePublisherChange = this.handlePublisherChange.bind(this)
    this.handleIsbnChange = this.handleIsbnChange.bind(this)
    this.handleEditionChange = this.handleEditionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      submitted: false,
      title: '',
      author: '',
      publisher: '',
      'isbn': '',
      'edition': ''
    }
  }
  validateIsbn() {
    const length = this.state.isbn.length
    if (length === 10) return 'success'
    else return 'error'
  }
  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }
  handleAuthorChange(event) {
    this.setState({
      author: event.target.value
    })
  }
  handlePublisherChange(event) {
    this.setState({
      publisher: event.target.value
    })
  }
  handleEditionChange(event) {
    this.setState({
      edition: event.target.value
    })
  }
  handleIsbnChange(event) {
    this.setState({
      isbn: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
      axios.post('http://localhost:9123/api/create', {
        title: this.state.title,
        edition: this.state.edition,
        author: [{
          name: this.state.author
        }],
        isbn: this.state.isbn,
        publisher: {
          name: this.state.publisher
        }
    }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}` 
        }
      })
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        this.setState({
          submitted: true,
          title: '',
          author: '',
          publisher: '',
          'isbn': '',
          'edition': ''
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })  
  }
  handleAlertDismiss() {
    this.setState({
      submitted: false
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
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <ControlLabel>Book Title</ControlLabel>
                    <FormControl onChange={this.handleTitleChange} type='text' value={this.state.title} placeholder='Book Title' />
                  </FormGroup>
                  <FormGroup validationState={this.validateIsbn()}>
                    <ControlLabel>ISBN</ControlLabel>
                    <FormControl onChange={this.handleIsbnChange} type='text' value={this.state.isbn} placeholder='ISBN' />
                    <HelpBlock>{this.validateIsbn}</HelpBlock>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Edition </ControlLabel>
                    <FormControl onChange={this.handleEditionChange} type='number' value={this.state.edition} placeholder='Edition' />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Publisher's Name</ControlLabel>
                    <FormControl onChange={this.handlePublisherChange} type='text' value={this.state.publisher} placeholder='Publishers Name' />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Authors Name </ControlLabel>
                    <FormControl onChange={this.handleAuthorChange} type='text' value={this.state.author} placeholder='Authors Name' />
                  </FormGroup>
                  <FormGroup>
                    <input type='submit' />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            {
              this.state.submitted ? (
                <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss.bind(this)}>
                  <strong>Yay !</strong> You've added a new book to library 
                </Alert>
              ) : null
            }
          </Grid>
        </div>
      </div>
    )
  }
}


export default createBook
