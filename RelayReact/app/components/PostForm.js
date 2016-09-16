/**
 * @providesModule components/PostForm
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class PostForm extends Component {
  static propTypes = {
    titleTextValue: PropTypes.string,
    contentTextValue: PropTypes.string,
    onTitleTextChange: PropTypes.func,
    onContentTextChange: PropTypes.func,
    submitActionName: PropTypes.string,
    onSubmitPress: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      contentTextInputHeight: 200
    };
  }

  render() {
    let {
      titleTextValue,
      contentTextValue,
      onTitleTextChange,
      onContentTextChange,
      submitActionName,
      onSubmitPress
    } = this.props;

    return (
      <ScrollView
        keyboardDismissMode="interactive"
      >
        <View style={styles.container}>
          <TextInput
            ref="titleTextInput"
            style={styles.titleTextInput}
            value={titleTextValue}
            onChangeText={onTitleTextChange}
            autoCapitalize="words"
            autoFocus={true}
            placeholder="Title"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.refs.contentTextInput.focus();
            }}
          />
          <View style={styles.divider} />
          <TextInput
            ref="contentTextInput"
            style={[
              styles.contentTextInput,
              {
                height: this.state.contentTextInputHeight
              }
            ]}
            value={contentTextValue}
            onChangeText={onContentTextChange}
            multiline={true}
            placeholder="Content ..."
            onContentSizeChange={(e) => {
              let height = e.nativeEvent.contentSize.height;
              if (height > 200) {
                this.setState({ contentTextInputHeight: height });
              } else {
                this.setState({ contentTextInputHeight: 200 });
              }
            }}
          />
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.postBtn}
            onPress={onSubmitPress}
          >
            <Text style={styles.postBtnText}>{submitActionName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardSpace} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#313B4722',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF'
  },
  titleTextInput: {
    height: 40,
    fontSize: 24
  },
  contentTextInput: {
    marginVertical: 4,
    fontSize: 18
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#313B4722'
  },
  postBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  postBtnText: {
    color: '#FD6E4D',
    fontSize: 18,
    fontWeight: '500'
  },
  keyboardSpace: {
    height: 272
  }
});
