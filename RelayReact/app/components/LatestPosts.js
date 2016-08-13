/**
 * @providesModule components/LatestPosts
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View
} from 'react-native';

import PostsList from 'components/PostsList';
import Paginator from 'components/Paginator';

const DEFAULT_PER_PAGE = 20;

class LatestPosts extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      perPage: DEFAULT_PER_PAGE,
      lastPaginateAction: null
    };
  }

  render() {
    let { site } = this.props;
    let { latestPosts: postConnection } = site;
    let { hasNextPage, hasPreviousPage } = postConnection.pageInfo;

    let { perPage } = this.state;

    return (
      <View style={styles.container}>
        <PostsList postConnection={postConnection} />
        <Paginator
          hasNextPage={this.canGoToNextPage.bind(this)()}
          hasPreviousPage={this.canGoToPreviousPage.bind(this)()}
          perPage={perPage}
          onNextPagePress={this.goToNextPage.bind(this)}
          onPreviousPagePress={this.goToPreviousPage.bind(this)}
          onPerPageChange={this.changePerPage.bind(this)}
        />
      </View>
    );
  }

  changePerPage(newPerPage) {
    if (newPerPage > 100) return;
    this.setState({ perPage: newPerPage });
    if (!newPerPage || newPerPage < 1) return;

    if (this.props.relay.variables.first) {
      this.props.relay.setVariables({ first: newPerPage });
    } else if (this.props.relay.variables.last) {
      this.props.relay.setVariables({ last: newPerPage });
    }
  }

  canGoToNextPage() {
    if (this.state.lastPaginateAction === 'previous') return true;
    let { latestPosts: postConnection } = this.props.site;
    return postConnection.pageInfo.hasNextPage;
  }

  canGoToPreviousPage() {
    if (this.state.lastPaginateAction === 'next') return true;
    let { latestPosts: postConnection } = this.props.site;
    return postConnection.pageInfo.hasPreviousPage;
  }

  goToNextPage() {
    let { latestPosts: postConnection } = this.props.site;
    if (!this.canGoToNextPage.bind(this)()) return;

    let { edges } = postConnection;
    let nextAfterCursor = edges[edges.length - 1].cursor;

    this.props.relay.setVariables({
      first: parseInt(this.state.perPage, 10) || DEFAULT_PER_PAGE,
      after: nextAfterCursor,
      last: null,
      before: null
    });

    this.setState({ lastPaginateAction: 'next' });
  }

  goToPreviousPage() {
    let { latestPosts: postConnection } = this.props.site;
    if (!this.canGoToPreviousPage.bind(this)()) return;

    let { edges } = postConnection;
    let nextBeforeCursor = edges[0].cursor;

    this.props.relay.setVariables({
      last: parseInt(this.state.perPage, 10) || DEFAULT_PER_PAGE,
      before: nextBeforeCursor,
      first: null,
      after: null
    });

    this.setState({ lastPaginateAction: 'previous' });
  }
}

export default Relay.createContainer(LatestPosts, {
  initialVariables: {
    first: DEFAULT_PER_PAGE,
    after: null,
    last: null,
    before: null
  },
  fragments: {
    site: () => Relay.QL`
      fragment on Site {
        latestPosts(
          first: $first,
          after: $after,
          last: $last,
          before: $before
        ) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
          }
          ${PostsList.getFragment('postConnection')}
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#697D9633'
  }
});
