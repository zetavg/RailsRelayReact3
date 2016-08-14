import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './app';

class RelayReact extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('main', () => RelayReact);
