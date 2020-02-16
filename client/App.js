import React from 'react'
import MainRouter from './MainRouter'               // this component houses all the custom views developed for the application
import {BrowserRouter} from 'react-router-dom'      // enable frontend routing with React Router
import { hot } from 'react-hot-loader'              // enable live reloading of the React components during development
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'  //MuiThemeProvider gives access to the Material-UI theme
import {indigo, pink} from 'material-ui/colors'

// Customizing the Material-UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
    openTitle: indigo['400'],
    protectedTitle: pink['400'],
    type: 'light'
  }
})

// Wrapping the root component with MUI theme and BrowserRouter
/* The custom theme variables defined previously are passed as a prop to the MuiThemeProvider,
making the theme available in all our custom React components.
*/
const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter/>
    </MuiThemeProvider>
  </BrowserRouter>
  )

export default hot(module)(App)
