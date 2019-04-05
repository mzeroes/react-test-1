import React, { Component } from 'react'
import { Segment, Loader, Feed, Card } from 'semantic-ui-react';
import moment from 'moment';
import { List, AutoSizer } from "react-virtualized";

class MessagesList extends Component {
  renderRow = ({ index }) => (
    <Card
      style={{width: '80%'}}
      link
      header={this.props.messages[index].senderId}
      meta={moment(this.props.messages[index].createdAt).fromNow()}
      description={ this.props.messages[index].text }
    />
  )

  render() {
    if (this.props.messages.length === 0)
      return (
        <Segment style={{ height: '100%', display: 'flex', width: '100%' }}>
          <Loader />
        </Segment>
      )
    return (
      <div style={{ display: 'flex', height: '100%',  width: '100%' }}>
          <div style={{ flex: 1 }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                 scrollToIndex={this.props.messages.length-1}
                  width={width}
                  height={height}
                  rowHeight={50}
                  rowRenderer={this.renderRow}
                  rowCount={this.props.messages.length} 
                  />
              )}
            </AutoSizer>
          </div>
      </div>
    )
  }
}

export default MessagesList
