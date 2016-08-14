/**
 * @providesModule containers/NavigationBarPostTitleContainer
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import NavigationBarPostTitle from 'components/NavigationBarPostTitle';

import PostRoute from 'routes/PostRoute';

export default class NavigationBarPostTitleContainer extends Component {
  static propTypes = {
    postID: PropTypes.string.isRequired
  }

  render() {
    let { postID } = this.props;

    return (
      <Relay.RootContainer
        Component={NavigationBarPostTitle}
        route={new PostRoute({ postID })}
      />
    );
  }
}
