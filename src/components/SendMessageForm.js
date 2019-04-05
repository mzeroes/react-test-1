import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react';

class SendMessageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  onChange(e) {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    const styles = {
      container: {
        padding: 20,
        marginBottom: 20,
      },
      form: {
        display: 'flex',
      },
      input: {
        flex: 1,
        fontSize: 16,
      },
    }
    return (
      <div style={styles.container}>
        <div>
          <form onSubmit={this.onSubmit} style={styles.form}>
            <Input
              type="text"
              placeholder="Type a message ..."
              onChange={this.onChange}
              value={this.state.text}
              style={styles.input}
            />
              <Button type="submit" >Send</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default SendMessageForm
