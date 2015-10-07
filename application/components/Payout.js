var React = require('react-native');
var { Icon, } = require('react-native-icons');
var styles = require('./styles');
var { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
var _ = require('underscore');

var Payout = React.createClass({
  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row', height: 100, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='fontawesome|user' size={40} style={styles.facebook} color='black'/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 20, marginRight: 10, marginTop: 20, flex: 1, textAlign: 'center'}}>
                {this.props.username}
              </Text>
                <View style={styles.payoutButton}>
                <TouchableHighlight
                  underlayColor="#bbb"
                  onPress={this.payout}
                  style={styles.payoutContainer}>
                  <Text style={styles.payoutText}>payout</Text>
                </TouchableHighlight>
                </View>
            </View>
          </View>
          <View style={{backgroundColor: '#b4b4b4', flex: 0.5}} >
            <Text style={{flex: 2, padding: 15, fontSize: 18, backgroundColor: '#a7a7a7' }}>
              Stars This Week: {this.props.starsThisWeek}
            </Text>
            <Text style={{flex: 1, padding: 15, fontSize: 18 }}>
              Total Stars: {this.props.total}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: 70}}>
          <View style={{backgroundColor: '#f7f7f7', flex: 1, flexDirection: 'row'}} >
            <TouchableHighlight underlayColor="#CCC" onPress={this.prevDate}>
              <Icon name='fontawesome|angle-left' size={40} style={styles.calendarSigns} color='black'/>
            </TouchableHighlight>
            <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center', flex: 8}}>Today</Text>
            <TouchableHighlight underlayColor="#CCC" onPress={this.nextDate}>
              <Icon name='fontawesome|angle-right' size={40} style={styles.calendarSigns} color='black'/>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{bottom:49}} automaticallyAdjustContentInsets={false}>


        </ScrollView>
      </View>
    )
  }
})

module.exports = Payout;
