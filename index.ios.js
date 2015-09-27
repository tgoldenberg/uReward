/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var BasicStorageExample = require('./application/components/Storage');
var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

var uReward = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: BasicStorageExample,
          title: 'BasicStorageExample'
        }}
      />
    );
  }
});


AppRegistry.registerComponent('uReward', () => uReward);
