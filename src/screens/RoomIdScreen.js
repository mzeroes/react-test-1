import React, { Component } from 'react'
import { Header, Container, Button, Input, Image, Icon } from 'semantic-ui-react';

import Title from '../components/Title';

class RoomIdScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: '',
      errorMessage: ''
    }
  }

  onSubmit = (event) => {
    if (this.state.roomId === '') this.setState({ errorMessage: 'Enter a correct roomId' });
    else {
      event.preventDefault()
      this.props.onSubmit(this.state.roomId)
    }
  }

  onChange = (event) => {
    this.setState({ roomId: event.target.value })
  }

  render() {
    return (
      <div className="App" >
        <Title />
        <Container style={{ width: '40%', padding: '20px' }}>
          <form onSubmit={this.onSubmit}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Header as='h2' icon textAlign='center'>
                <Header.Content>Enter a Room ID</Header.Content>
              </Header>
              <Input
                type="text" onChange={this.onChange}
                placeholder='Enter a Room ID'
              />
              <Button type="submit" style={{ marginTop: '20px' }}>Continue</Button>
              <span>{this.state.errorMessage}</span>
            </div>
          </form>
        </Container>
      </div>
    )
  }
}

export default RoomIdScreen
