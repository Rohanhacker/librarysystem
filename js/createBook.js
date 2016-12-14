import React from 'react'
import {Grid, Row, Col, PageHeader} from 'react-bootstrap'
import Navbar from './Navbar'
import axios from 'axios'

class createBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className='grid'>
          <Grid>
            <Row className='show-grid'>
              <Col xs={12} md={8} mdOffset={2}>
                Form here
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}


export default createBook
