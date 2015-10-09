'use strict';
let Register = require('./application/components/signup/Register');
const React = require('react-native');
let { AppRegistry, NavigatorIOS, StyleSheet, Text, View } = React;

class uReward extends React.Component{
  render() {
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
};

var styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

AppRegistry.registerComponent('uReward', () => uReward);
