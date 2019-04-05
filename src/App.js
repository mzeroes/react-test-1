import React, { Component } from 'react'
import NickNameScreen from './screens/NickNameScreen'
import ChatScreen from './screens/ChatScreen'
import './App.css'
import 'react-virtualized/styles.css'
import 'semantic-ui-css/semantic.min.css'
import { SERVER_URI } from './config';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'WhatIsYourUsernameScreen',
      error: ''
    }
  }

  onNickNameSubmit = (username) => {
    fetch(`${SERVER_URI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen',
        })
      })
      .catch(error => console.error('error', error))
  }
  componentDidCatch(error){
    this.setState({error, currentScreen: 'error'})
  }
  render() {
    switch(this.state.currentScreen) {
      case "WhatIsYourUsernameScreen" : 
        return <NickNameScreen onSubmit={this.onNickNameSubmit} />
      case "ChatScreen":
        return <ChatScreen currentUsername={this.state.currentUsername} />
      default :
      return (
        <div>{this.state.error}</div>
      )
    }
  }
}

export default App
