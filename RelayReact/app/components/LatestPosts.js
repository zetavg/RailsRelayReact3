/**
 * @providesModule components/LatestPosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import PostsList from 'components/PostsList';

class LatestPosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired
  }

  render() {
    let { site } = this.props;

    return (
      <PostsList postConnection={site.latestPosts} />
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
