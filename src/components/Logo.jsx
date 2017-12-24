import React from 'react'
import ReactDOM from 'react-dom'

var ERS_Logo = require('-!svg-react-loader?name=ERS_Logo!../assets/ERS-Logo.svg');




export default class Logo extends React.Component{

render() {
  return React.createElement(ERS_Logo, { className: 'normal' });
  }

}

window.Logo = Logo;
