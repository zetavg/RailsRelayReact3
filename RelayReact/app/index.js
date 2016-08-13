import React, { Component } from 'react';
import Relay, { DefaultNetworkLayer } from 'react-relay';

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('http://localhost:3000/graphql')
);

import {
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import WelcomePage from './WelcomePage';

import LatestPostsContainer from 'containers/LatestPostsContainer';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#191E24"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={{ name: 'latestPosts' }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (index > 0) return (
                    <TouchableOpacity style={styles.navigationLeftButton} onPress={navigator.pop}>
                      <Text style={styles.navigationLeftButtonText}> 〈 </Text>
                    </TouchableOpacity>
                  );
                },
                RightButton: (route, navigator, index, navState) => {},
                Title: (route, navigator, index, navState) => {
                  let title;

                  switch (route.name) {
                  case 'latestPosts':
                    title = 'Latest Posts';
                    break;
                  default:
                    title = 'Welcome';
                    break;
                  }

                  return (
                    <View style={styles.navigationBarTitle}>
                      <Text style={styles.navigationBarTitleText}>{title}</Text>
                    </View>
                  );
                }
              }}
              style={styles.navigationBar}
            />
          }
          renderScene={(route, navigator) => {
            switch (route.name) {
            case 'latestPosts':
              return (
                <ScrollView style={styles.content}>
                  <LatestPostsContainer/>
                </ScrollView>
              );
            default:
              return <WelcomePage navigator={navigator} />;
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: '#313B47'
  },
  navigationLeftButton: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  navigationLeftButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '200'
  },
  navigationBarTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  navigationBarTitleText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500'
  },
  content: {
    paddingTop: 72,
    backgroundColor: '#F0F4F7'
  }
});
