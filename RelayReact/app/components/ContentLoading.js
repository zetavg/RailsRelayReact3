/**
 * @providesModule components/ContentLoading
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export default class ContentLoading extends Component {
  static propTypes = {
    error: PropTypes.object,
    onRetryPress: PropTypes.func
  }

  render() {
    let { error, onRetryPress } = this.props;

    return (
      <View style={styles.loadingMessage}>
        {(() => {
          if (!error) return <ActivityIndicator/>;
        })()}

        <Text style={styles.loadingMessageText}>
          {error && error.message || 'Loading...'}
        </Text>

        {(() => {
          if (onRetryPress) return (
            <TouchableOpacity onPress={onRetryPress}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          );
        })()}
      </View>
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
