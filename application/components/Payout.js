var React = require('react-native');
var { Icon, } = require('react-native-icons');
var styles = require('./styles');
var { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
var _ = require('underscore');

var Payout = React.createClass({
  render: function() {
    return (
      <View>
        <Text>PAYOUT</Text>
      </View>
    )
  }
})

module.exports = Payout;
