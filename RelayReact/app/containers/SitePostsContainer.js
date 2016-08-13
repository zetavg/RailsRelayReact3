/**
 * @providesModule containers/SitePostsContainer
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

import SitePosts from 'components/SitePosts';
import SiteRoute from 'routes/SiteRoute';

export default class SitePostsContainer extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={SitePosts}
        route={new SiteRoute()}
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
      />
    );
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
