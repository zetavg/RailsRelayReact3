/**
 * @providesModule components/SitePosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import PostsList from 'components/PostsList';

class SitePosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired
  }

  render() {
    let { site } = this.props;

    return (
      <PostsList postConnection={site.posts} />
    );
  }
}

export default Relay.createContainer(SitePosts, {
  fragments: {
    site: () => Relay.QL`
      fragment on Site {
        posts(first: 10) {
          ${PostsList.getFragment('postConnection')}
        }
      }
    `
  }
});
