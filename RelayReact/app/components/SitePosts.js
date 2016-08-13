/**
 * @providesModule components/SitePosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import PostsList from 'components/PostsList';

class SitePosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    relay: PropTypes.shape({
      variables: PropTypes.object.isRequired,
      setVariables: PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    let { site } = this.props;

    return (
      <PostsList
        postConnection={site.posts}
        onEndReached={this.loadMorePosts.bind(this)}
      />
    );
  }

  loadMorePosts() {
    let { pageInfo } = this.props.site.posts;
    if (!pageInfo.hasNextPage) return;

    let { postsCount } = this.props.relay.variables;
    this.props.relay.setVariables({
      postsCount: postsCount + 10
    });
  }
}

export default Relay.createContainer(SitePosts, {
  initialVariables: {
    postsCount: 10
  },
  fragments: {
    site: () => Relay.QL`
      fragment on Site {
        posts(first: $postsCount) {
          pageInfo {
            hasNextPage
          }
          ${PostsList.getFragment('postConnection')}
        }
      }
    `
  }
});
