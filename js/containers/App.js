import React from 'react'
import {BrowserRouter, Match, Redirect, Route} from 'react-router'
import Landing from './Landing'
import createBook from './createBook'
import Token from './Token'
import '../../public/css/style.scss'
import 'normalize-css'

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/'
          component={Landing} />
        <Match pattern='/create'
          component={createBook} />
        <Match pattern='/auth/:token'
          component={Token} /> 
      </div>
    </BrowserRouter>
  )
}

