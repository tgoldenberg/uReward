/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var Register = require('./application/components/signup/Register');
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
          component: Register,
          title: 'Register'
        }}
      />
    );
  }
});


AppRegistry.registerComponent('uReward', () => uReward);
