/**
 * @providesModule containers/SitePostsContainer
 */

import React, { Component } from 'react';
import Relay from 'react-relay';

import SitePosts from 'components/SitePosts';
import SiteRoute from 'routes/SiteRoute';

export default class SitePostsContainer extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={SitePosts}
        route={new SiteRoute()}
      />
    );
  }
}
