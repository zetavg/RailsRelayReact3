/**
 * @providesModule containers/LatestPostsContainer
 */

import React, { Component } from 'react';
import Relay from 'react-relay';

import LatestPosts from 'components/LatestPosts';
import SiteRoute from 'routes/SiteRoute';

export default class LatestPostsContainer extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={LatestPosts}
        route={new SiteRoute()}
      />
    );
  }
}
