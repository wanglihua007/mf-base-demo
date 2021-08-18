/*
 * @Author: your name
 * @Date: 2021-05-18 14:15:50
 * @LastEditTime: 2021-05-26 22:12:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /uskid-classroom-client/src/index.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
