import React, { Component } from 'react';
import {
  Text,
  View,
  AppRegistry
} from 'react-native';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.1.1:3000/websocket');

class snippeter extends Component {
  renderRow(task) {
    return (
      <Text>{task.text}</Text>
    );
  }

  render() {
      const { tasksReady } = this.props;
      return (
      <View>
        <Text>Title</Text>
          {!tasksReady && <Text>Not Ready</Text>}

          <MeteorListView
            collection="tasks"
            renderRow={this.renderRow}
          />

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