/**
 * @providesModule components/PostTitle
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class PostTitle extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    let { post } = this.props;

    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{post.title}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(PostTitle, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        title
      }
    `
  }
});

const styles = StyleSheet.create({
  titleWrapper: {
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  titleText: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#6499C5',
    fontSize: 16,
    fontWeight: '500'
  }
});
