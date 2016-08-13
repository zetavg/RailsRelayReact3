/**
 * @providesModule containers/LatestPostsContainer
 */

import React, { Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import LatestPosts from 'components/LatestPosts';
import SiteRoute from 'routes/SiteRoute';

export default class LatestPostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: new SiteRoute(),
      refreshing: false,
      forceFetch: false
    };
  }

  render() {
    return (
      <Relay.RootContainer
        Component={LatestPosts}
        route={this.state.route}
        forceFetch={this.state.forceFetch}
        renderLoading={() => {
          return (
            <View style={styles.loadingMessage}>
              <ActivityIndicator/>
              <Text style={styles.loadingMessageText}>Loading...</Text>
            </View>
          );
        }}
        renderFailure={(error, retry) => {
          return (
            <View style={styles.loadingMessage}>
              <Text style={styles.loadingMessageText}>{error.message}</Text>
              <TouchableOpacity onPress={retry}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderFetched={(data) => {
          return (
            <LatestPosts
              {...data}
              onRefresh={this.refresh.bind(this)}
              refreshing={this.state.refreshing}
            />
          );
        }}
        onReadyStateChange={this.handleReadyStateChange.bind(this)}
      />
    );
  }

  handleReadyStateChange(readyState) {
    this.setState({
      refreshing: readyState.stale
    });
  }

  refresh() {
    this.setState({
      route: new SiteRoute(),
      refreshing: true,
      forceFetch: true
    }, () => {
      this.setState({ forceFetch: false });
    });
  }
}

const styles = StyleSheet.create({
  loadingMessage: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingMessageText: {
    marginVertical: 16
  },
  retryText: {
    textDecorationLine: 'underline'
  }
});
