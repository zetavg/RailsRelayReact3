/**
 * @providesModule containers/SitePostsContainer
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import SitePosts from 'components/SitePosts';
import SiteRoute from 'routes/SiteRoute';
import ContentLoading from 'components/ContentLoading';

export default class SitePostsContainer extends Component {
  static propTypes = {
    onPostPress: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      route: new SiteRoute(),
      refreshing: false,
      forceFetch: false
    };
  }

  render() {
    let { onPostPress } = this.props;

    return (
      <Relay.RootContainer
        Component={SitePosts}
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
            <SitePosts
              {...data}
              onRefresh={this.refresh.bind(this)}
              refreshing={this.state.refreshing}
              onPostPress={onPostPress}
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
    this.setState({
      route: new SiteRoute(),
      refreshing: true,
      forceFetch: true
    }, () => {
      this.setState({ forceFetch: false });
    });
  }
}
