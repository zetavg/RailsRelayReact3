/**
 * @providesModule components/Comment
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  render() {
    let { comment } = this.props;

    return (
      <View style={styles.comment}>
        <Text style={styles.commentText}>{comment.content}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on Comment {
        content
      }
    `
  }
});

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  commentText: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 16,
    color: '#333'
  }
});
