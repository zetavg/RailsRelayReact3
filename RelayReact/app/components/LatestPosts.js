/**
 * @providesModule components/LatestPosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View
} from 'react-native';

import PostsList from 'components/PostsList';

class LatestPosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired
  }

  render() {
    let { site } = this.props;

    return (
      <View style={styles.container}>
        <PostsList postConnection={site.latestPosts} />
      </View>
    );
  }
}

export default Relay.createContainer(LatestPosts, {
  fragments: {
    site: () => Relay.QL`
      fragment on Site {
        latestPosts(first: 10) {
          ${PostsList.getFragment('postConnection')}
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#697D9633'
  }
});
