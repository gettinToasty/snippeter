import React, { Component } from 'react';
import {
  Text,
  View,
  AppRegistry
} from 'react-native';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
import CodeMirror from 'react-codemirror';

Meteor.connect('ws://192.168.1.1:3000/websocket');

class snippeter extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "" };
  }

  renderRow(task) {
    return (
      <Text>{task.text}</Text>
    );
  }

  updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

  render() {
      const { tasksReady } = this.props;
      return (
      <View>
        <CodeMirror value={this.state.code} onChange={this.updateCode} />
      </View>
    );
  }
}

export default createContainer( params => {
  const handle = Meteor.subscribe('tasks');
  return {
    tasksReady: handle.ready()
  };
}, snippeter);

AppRegistry.registerComponent('snippeter', () => snippeter);