/**
 * @providesModule components/Paginator
 */

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class Paginator extends Component {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    hasPreviousPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number.isRequired,
    onNextPagePress: PropTypes.func.isRequired,
    onPreviousPagePress: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired
  }

  render() {
    let {
      hasNextPage,
      hasPreviousPage,
      perPage,
      onNextPagePress,
      onPreviousPagePress,
      onPerPageChange
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPreviousPagePress}
          style={[
            styles.rowItem,
            styles.rowItem_stretch,
            styles.btn,
            !hasPreviousPage && styles.btn_disabled
          ]}
          activeOpacity={hasPreviousPage ? 0.5 : 1}
        >
          <Text style={styles.btnText}> « </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextPagePress}
          style={[
            styles.rowItem,
            styles.rowItem_stretch,
            styles.btn,
            !hasNextPage && styles.btn_disabled
          ]}
          activeOpacity={hasNextPage ? 0.5 : 1}
        >
          <Text style={styles.btnText}> » </Text>
        </TouchableOpacity>

        <View
          style={[styles.rowItem, styles.rowItem_last]}
        >
          <Text style={styles.perPageText}>per page: </Text>
          <TextInput
            style={styles.perPageTextInput}
            keyboardType="numeric"
            value={perPage && perPage.toString()}
            onChangeText={(value) => {
              let perPageNumber = parseInt(value, 10);
              if(isNaN(perPageNumber)) perPageNumber = null;
              onPerPageChange(perPageNumber);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  rowItem: {
    marginRight: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowItem_last: {
    marginRight: 0
  },
  rowItem_stretch: {
    flex: 100
  },
  btn: {
    height: 54,
    backgroundColor: '#FC6E44',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    fontSize: 16
  },
  btn_disabled: {
    backgroundColor: '#C9C9C9'
  },
  perPageText: {
    marginLeft: 16,
    fontSize: 12
  },
  perPageTextInput: {
    alignSelf: 'center',
    marginRight: 16,
    marginTop: 2,
    width: 32,
    height: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#C9C9C9',
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingTop: 4,
    paddingBottom: 3,
    fontSize: 12
  }
});
