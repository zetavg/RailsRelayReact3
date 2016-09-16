/**
 * @providesModule mutations/CreateCommentMutation
 */

import React, { PropTypes } from 'react';
import Relay from 'react-relay';

export default class CreateCommentMutation extends Relay.Mutation {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    comment: PropTypes.shape({
      content: React.PropTypes.string.isRequired
    }).isRequired
  }

  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { createComment }`;
  }

  getVariables() {
    return {
      postID: this.props.post.id,
      content: this.props.comment.content
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateCommentPayload {
        post {
          comments
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'post',
        parentID: this.props.post.id,
        connectionName: 'comments',
        edgeName: 'commentEdge',
        rangeBehaviors: ({ order }) => {
          switch (order || 'newest') {
          case 'newest':
            return 'prepend';
          default:
            return 'append';
          }
        }
      }
    ];
  }
}
