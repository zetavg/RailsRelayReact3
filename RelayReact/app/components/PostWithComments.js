/**
 * @providesModule components/PostWithComments
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  ListView,
  View,
  RefreshControl
} from 'react-native';

import Post from 'components/Post';
import Comment from 'components/Comment';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__
});

const getDataSourceFromProps = (props) => {
  return dataSource.cloneWithRows([
    props.post,
    null,
    ...props.post.comments.edges
  ]);
};

class PostWithComments extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    relay: PropTypes.shape({
      variables: PropTypes.object.isRequired,
      setVariables: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: getDataSourceFromProps(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post !== nextProps.post ||
        this.props.post.comments.edges !== nextProps.post.comments.edges) {
      this.setState({
        dataSource: getDataSourceFromProps(nextProps)
      });
    }
  }

  renderRow(rowData, sectionID, rowID) {
    if (rowID === '0') { // post
      return <Post post={rowData} />;

    } else if (rowID === '1') { // blank area
      return <View style={styles.blankArea} />;

    } else { // comment
      return <Comment comment={rowData.node} />;
    }
  }

  renderSeparator(sectionID, rowID) {
    if (rowID === '0') {
      return (
        <View
          key={`sep-${sectionID}-${rowID}`}
        />
      );
    } else if (rowID === '1') {
      return (
        <View
          key={`sep-${sectionID}-${rowID}`}
          style={styles.heavySeparator}
        />
      );

    } else if (sectionID === 'footer') {
      return (
        <View
          key={`sep-${sectionID}-${rowID}`}
          style={[styles.heavySeparator, styles.blankArea]}
        />
      );

    } else {
      return (
        <View
          key={`sep-${sectionID}-${rowID}`}
          style={styles.separator}
        />
      );
    }
  }

  render() {
    return (
      <ListView
        refreshControl={
          this.props.onRefresh ?
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
          :
          null
        }
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this.renderSeparator.bind(this)}
        renderFooter={this.renderSeparator.bind(this, 'footer')}
        onEndReached={this.loadMoreComments.bind(this)}
      />
    );
  }

  loadMoreComments() {
    let { pageInfo } = this.props.post.comments;
    if (!pageInfo.hasNextPage) return;

    let { commentsCount } = this.props.relay.variables;
    this.props.relay.setVariables({
      commentsCount: commentsCount + 10
    });
  }

  handleRefresh() {
    this.props.relay.setVariables({
      commentsCount: 10
    });
    this.props.onRefresh && this.props.onRefresh();
  }
}

export default Relay.createContainer(PostWithComments, {
  initialVariables: {
    commentsCount: 10
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        ${Post.getFragment('post')},
        comments(first: $commentsCount) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              ${Comment.getFragment('comment')}
            }
          }
        }
      }
    `
  }
});

const styles = StyleSheet.create({
  blankArea: {
    marginBottom: 16
  },
  separator: {
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: '#FFF',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E4EBF1'
  },
  heavySeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#313B4716'
  }
});
