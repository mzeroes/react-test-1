import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from '../components/MessageList'
import SendMessageForm from '../components/SendMessageForm'
import TypingIndicator from '../components/TypingIndicator'
import OnlineList from '../components/OnlineList'
import { SERVER_URI, INSTANCE_LOCATER } from '../config';
import { Grid } from 'semantic-ui-react';

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }

  }

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }

  sendMessage = (text) => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: INSTANCE_LOCATER,
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: `${SERVER_URI}/authenticate`,
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId: '31207023',
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          },
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    const styles = {
      chatContainer: {
        height: '100vh',
        width: '100vw'
      }
    }

    return (
      <div style={{ 
        overflow: 'hidden', 
        height: "100vh", 
        width: '100vw', 
        padding: 20,
        backgroundColor: '#eee'
        }}>
        <Grid style={{height: '80%'}}>
          <Grid.Column width={"13"}>
              <MessageList
                messages={this.state.messages}
                style={styles.chatList}
              />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </Grid.Column>
        <Grid.Column width={"3"}>
            <OnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default ChatScreen
