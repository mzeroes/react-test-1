import React, { Component } from 'react'
import { Header, Container, Button, Input, Image, Icon } from 'semantic-ui-react';

import Title from '../components/Title';

class NickNameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      errorMessage: ''
    }
  }

  onSubmit = (event) => {
    if (this.state.username === '') this.setState({ errorMessage: 'Enter a correct username' });
    else {
      event.preventDefault()
      this.props.onSubmit(this.state.username)
    }
  }

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  render() {
    return (
      <div className="App" >
        <Title title="React-Test-1"/>
        <Container style={{ width: '40%', padding: '20px' }}>
          <form onSubmit={this.onSubmit}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Chose a NickName</Header.Content>
              </Header>
              <Input
                type="text" onChange={this.onChange}
                placeholder='Enter a nick name'
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

export default NickNameScreen
