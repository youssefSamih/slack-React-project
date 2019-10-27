import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';

import { setCurrentChannel, setPrivateChannel } from "../../actions";
import firebase from '../../firebase';

class Starred extends Component {
  state = {
    starredChannels: [],
    activeChannel: '',
    user: this.props.currentUser,
    userRef: firebase.database().ref('users')
  };

  componentDidMount() {
    if(this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  };

  componentWillUnmount = () => {
    this.removeListener();
  };

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
  };

  addListeners = userId => {
    this.state.userRef
      .child(userId)
      .child('starred')
      .on('child_added', snap => {
        const starredChannel = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel]
        });
      });

      this.state.userRef
        .child(userId)
        .child('starred')
        .on("child_removed", snap => {
          const channelToRemove = { id: snap.key, ...snap.val() };
          const filteredChannels = this.state.starredChannels.filter(channel => {
            return channel.id !== channelToRemove.id
          });
          this.setState({ starredChannels: filteredChannels })
        })
  }

  displayChannels = starredChannels => {
    return starredChannels.length > 0 && starredChannels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # { channel.name }
      </Menu.Item>
    ))
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  render() {
    const { starredChannels } = this.state;
    return ( 
      <Menu.Menu className="menu" >
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>
          ({ starredChannels.length }) 
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
     );
  }
}
 
export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);

