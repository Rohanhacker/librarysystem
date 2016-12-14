import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'


class Book extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
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
          </Col>
        </Row>
      </div>
    )
  }
}

const {string, object, number, array } = React.PropTypes

Book.propTypes = {
  title: string,
  isbn: string,
  edition: number,
  author: array,
  publisher: object
}

export default Book
