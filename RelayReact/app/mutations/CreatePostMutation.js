/**
 * @providesModule mutations/CreatePostMutation
 */

import React, { PropTypes } from 'react';
import Relay from 'react-relay';

export default class CreatePostMutation extends Relay.Mutation {
  static propTypes = {
    post: PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired
    }).isRequired
  }

  getMutation() {
    return Relay.QL`mutation { createPost }`;
  }

  getVariables() {
    return {
      title: this.props.post.title,
      content: this.props.post.content
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePostPayload {
        site {
          posts
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'site',
        parentID: 'site',
        connectionName: 'posts',
        edgeName: 'postEdge',
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
