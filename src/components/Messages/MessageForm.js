import React, { Component } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'

export default class MessageForm extends Component {
  state = {
    message: "",
    channel: this.props.c
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message } = this.state;
    if(messagesRef){
      this.setState({ loading: true });
      messagesRef
        .child(channelId)
    }
  };

  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={'add'} />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group Icon widths="2">
          <Button
            onClick={ this.sendMessage }
            color="orange"
            labelPosition="left"
            icon="edit"
            content="Add Reply"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    )
  }
}
