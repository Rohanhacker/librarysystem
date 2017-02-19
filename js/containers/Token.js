import React, {Component} from 'react';
import {Link} from 'react-router'

class Token extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        localStorage.setItem('token', this.props.params.token);
        this.context.router.transitionTo('/')
    }
    render() {
        return <h1>Loading</h1>
    }
} 

const {object} = React.PropTypes

Token.contextTypes = {
    router: object
}

Token.propTypes = {
    params: object
}

export default Token
