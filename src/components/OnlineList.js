import React, { Component } from 'react'
import { Placeholder, Icon } from 'semantic-ui-react';
import { List, AutoSizer } from "react-virtualized";

class OnlineList extends Component {

  renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <div>
          {
            this.props.users[index].id === this.props.currentUser.id
              ? <Icon color='green' name='checkmark' circular />
              :
              (
                this.props.users[index].presence.state === 'online'
                  ?
                  <Icon color='blue' name='checkmark' circular />
                  :
                  <Icon color='grey' name='checkmark' circular />
              )
          }
          <span>
            {this.props.users[index].name}
          </span>
        </div>
      </div>

    )
  }

  renderUsers() {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowHeight={50}
                rowRenderer={this.renderRow}
                rowCount={this.props.users.length} />
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.users) {
      return this.renderUsers()
    } else {
      return (
        <Placeholder>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      )
    }
  }
}

export default OnlineList
