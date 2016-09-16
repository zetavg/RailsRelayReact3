/**
 * @providesModule components/NewCommentBox
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

import CreateCommentMutation from 'mutations/CreateCommentMutation';

class NewCommentBox extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      commentContentValue: null,
      contentTextInputHeight: 24
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.textInput,
            { height: this.state.contentTextInputHeight }
          ]}
          value={this.state.commentContentValue}
          onChangeText={(text) => this.setState({ commentContentValue: text })}
          multiline={true}
          blurOnSubmit={true}
          placeholder="New comment ..."
          returnKeyType="send"
          onSubmitEditing={() => {
            this.props.relay.commitUpdate(
              new CreateCommentMutation({
                post: this.props.post,
                comment: {
                  content: this.state.commentContentValue
                }
              }),
              {
                onSuccess: () => {
                  this.setState({ commentContentValue: '' });
                }
              }
            );
          }}
          onContentSizeChange={(e) => {
            let height = e.nativeEvent.contentSize.height;
            this.setState({ contentTextInputHeight: height });
          }}
        />
      </View>
    );
  }
}

export default Relay.createContainer(NewCommentBox, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        ${CreateCommentMutation.getFragment('post')}
      }
    `
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24
  }
});
