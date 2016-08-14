/**
 * @providesModule containers/PostContainer
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import Post from 'components/Post';
import PostRoute from 'routes/PostRoute';
import ContentLoading from 'components/ContentLoading';

export default class PostContainer extends Component {
  static propTypes = {
    postID: PropTypes.string.isRequired
  }

  render() {
    let { postID } = this.props;

    return (
      <Relay.RootContainer
        Component={Post}
        route={new PostRoute({ postID })}
        renderLoading={() => {
          return (
            <ContentLoading/>
          );
        }}
        renderFailure={(error, retry) => {
          return (
            <ContentLoading
              error={error}
              onRetryPress={retry}
            />
          );
        }}
      />
    );
  }
}
