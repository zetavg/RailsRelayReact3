/**
 * @providesModule components/Post
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';

import PostTitle from 'components/PostTitle';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    let { post } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <PostTitle post={post} />
          <View style={styles.postContent}>
            <Text style={styles.postContentText}>{post.content}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Relay.createContainer(Post, {
  initialVariables: {
    commentsCount: 5
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        content,
        ${PostTitle.getFragment('post')}
      }
    `
  }
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#313B4722',
    paddingVertical: 12,
    backgroundColor: '#FFF'
  },
  postContent: {
    paddingBottom: 24,
    paddingHorizontal: 16
  },
  postContentText: {
    fontSize: 15,
    lineHeight: 24
  }
});
