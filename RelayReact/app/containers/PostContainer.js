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

  constructor(props) {
    super(props);

    let { postID } = props;

    this.state = {
      route: new PostRoute({ postID }),
      refreshing: false,
      forceFetch: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.postID !== nextProps.postID) {
      let { postID } = nextProps;
      this.setState({
        route: new PostRoute({ postID })
      });
    }
  }

  render() {
    return (
      <Relay.RootContainer
        Component={Post}
        route={this.state.route}
        forceFetch={this.state.forceFetch}
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
        renderFetched={(data) => {
          return (
            <Post
              {...data}
              onRefresh={this.refresh.bind(this)}
              refreshing={this.state.refreshing}
            />
          );
        }}
        onReadyStateChange={this.handleReadyStateChange.bind(this)}
      />
    );
  }

  handleReadyStateChange(readyState) {
    this.setState({
      refreshing: readyState.stale
    });
  }

  refresh() {
    let { postID } = this.props;

    this.setState({
      route: new PostRoute({ postID }),
      refreshing: true,
      forceFetch: true
    }, () => {
      this.setState({ forceFetch: false });
    });
  }
}
