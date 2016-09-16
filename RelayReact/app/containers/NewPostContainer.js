/**
 * @providesModule containers/NewPostContainer
 */

import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import PostForm from 'components/PostForm';

import CreatePostMutation from 'mutations/CreatePostMutation';

export default class NewPostContainer extends Component {
  static propTypes = {
    onCreateSuccess: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      title: null,
      content: null
    };
  }

  render() {
    let {
      title,
      content
    } = this.state;

    return (
      <PostForm
        titleTextValue={title}
        contentTextValue={content}
        onTitleTextChange={(text) => this.setState({ title: text })}
        onContentTextChange={(text) => this.setState({ content: text })}
        submitActionName="Create Post"
        onSubmitPress={() => {
          let post = {
            title: this.state.title,
            content: this.state.content
          };

          Relay.Store.commitUpdate(new CreatePostMutation({ post }), {
            onSuccess: response => {
              this.props.onCreateSuccess(response);
            },
            onFailure: () => {
              alert('An error occurred, please try again.');
            }
          });
        }}
      />
    );
  }
}
