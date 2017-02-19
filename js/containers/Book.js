import React from 'react'
import {Row, Col, Image, Button, ButtonToolbar, Form, FormControl, ControlLabel, Modal, FormGroup, HelpBlock} from 'react-bootstrap'
import axios from 'axios'
import jwtDecode from 'jwt-decode'


class Book extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.validateIsbn = this.validateIsbn.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handlePublisherChange = this.handlePublisherChange.bind(this)
    this.handleIsbnChange = this.handleIsbnChange.bind(this)
    this.handleEditionChange = this.handleEditionChange.bind(this)
    if(localStorage.token) {
      const jwt = jwtDecode(localStorage.token)
      this.state = {
        fId: jwt.sub,
        edit: false,
        showModal: false,
        deleted: false,
        title: this.props.title,
        author: this.props.author[0].name || [],
        publisher: this.props.publisher.name,
        isbn: this.props.isbn,
        edition: this.props.edition
      }
    } else {
      this.state = {
        fId: '',
        edit: false,
        showModal: false,
        deleted: false,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        edition: ''
      }
    }
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
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
  handleEdit(e) {
    e.preventDefault()
      axios.put(`http://localhost:9123/api/book/${this.props.id}`, {
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
          showModal: false
        })
      } 
    })
    .catch(function (error) {
      console.log(error)
      localStorage.clear()
      this.props.logout()
    })
  }
  handleDelete() {
    axios.post('http://localhost:9123/api/delete', {
      isbn: this.props.isbn
    },{
      headers: {
        'Authorization': `Bearer ${localStorage.token}` 
      }
    })
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        console.log(response)
        this.setState({deleted: true})
      }
    })
    .catch((error) => {
      localStorage.clear()
      this.props.logout()
    })
  }
  render() {
    if(!this.state.deleted) {
      return (
        <div className='bookItem'>
          <Row className='show-grid'>
            <Col xs={6} md={4}>  <Image src='/public/img/cover-web.png' responsive /> </Col>
            <Col xs={6} md={4}>
              <h4>Title : {this.props.title}</h4>
              <div className='authors'>
                {
                  this.props.author.length > 1 ? <h5>Authors : </h5> : <h5>Author : </h5>
                }
                {
                  this.props.author.map((item) => {
                    return item['name']
                  }).toString()
                }
              </div>
              <h5>Edition : {this.props.edition} </h5>
              <h5>Publisher : {this.props.publisher.name}</h5>
              <h5>ISBN : {this.props.isbn} </h5>
              {
                this.props.auth && this.props.userId === this.state.fId ? (
                  <ButtonToolbar>
                    <Button bsSize='xsmall' bsStyle='success' onClick={this.open} >Edit</Button>
                    <Button onClick={this.handleDelete} bsSize='xsmall' bsStyle='danger' >Delete</Button>
                  </ButtonToolbar>
                  ) : null
              }
            </Col>
          </Row>
          <Modal
            show={this.state.showModal}
            onHide={this.close}
        >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title'>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleEdit}>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    } else {
      return null
    }
  }
}

const {string, object, number, array, func } = React.PropTypes

Book.propTypes = {
  title: string,
  isbn: string,
  edition: number,
  author: array,
  publisher: object,
  userId: object,
  auth: object,
  logout: func,
  id: object
}

export default Book
