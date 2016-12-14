import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter, Match} from 'react-router'
import Landing from './Landing'
import createBook from './createBook'
import '../public/css/style.scss'
import 'normalize-css'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/'
          component={Landing} />
        <Match pattern='/create'
          component={createBook} />
        {/* <Match pattern='/book/:id'
          component={BookDetails} /> */}
      </div>
    </BrowserRouter>
  )
}

render(<App />, document.querySelector('#App'))
