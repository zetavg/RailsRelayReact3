/**
 * @providesModule components/NavigationBarTitle
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class NavigationBarTitle extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    let { children } = this.props;

    return (
      <View style={styles.navigationBarTitle}>
        <Text
          style={styles.navigationBarTitleText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  navigationBarTitleText: {
    marginHorizontal: 64,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500'
  }
});
