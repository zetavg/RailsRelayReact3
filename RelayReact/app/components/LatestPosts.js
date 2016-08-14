/**
 * @providesModule components/LatestPosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import PostsList from 'components/PostsList';

class LatestPosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
    relay: PropTypes.shape({
      variables: PropTypes.object.isRequired,
      setVariables: PropTypes.func.isRequired
    }).isRequired,
    onPostPress: PropTypes.func
  }

  render() {
    let { site, onPostPress } = this.props;

    return (
      <PostsList
        postConnection={site.latestPosts}
        onEndReached={this.loadMorePosts.bind(this)}
        onRefresh={this.refresh.bind(this)}
        refreshing={this.props.refreshing}
        onPostPress={onPostPress}
      />
    );
  }

  loadMorePosts() {
    let { pageInfo } = this.props.site.latestPosts;
    if (!pageInfo.hasNextPage) return;

    let { postsCount } = this.props.relay.variables;
    this.props.relay.setVariables({
      postsCount: postsCount + 10
    });
  }

  refresh() {
    this.props.relay.setVariables({
      postsCount: 10
    }, this.props.onRefresh);
  }
}

export default Relay.createContainer(LatestPosts, {
  initialVariables: {
    postsCount: 10
  },
  fragments: {
    site: () => Relay.QL`
      fragment on Site {
        latestPosts(first: $postsCount) {
          pageInfo {
            hasNextPage
          }
          ${PostsList.getFragment('postConnection')}
        }
      }
    `
  }
});
