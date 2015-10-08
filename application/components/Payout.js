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
            <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center', flex: 8}}>Rewards</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{bottom:0}} automaticallyAdjustContentInsets={false}>
          {this.props.rewards.map((reward, idx) => {
            return <View style={styles.rewardContainer} key={idx} ref={`item${idx}`}>
              <View style={styles.starContainer}>
                <Text style={styles.starText}>{reward.stars}</Text>
                <Icon name='fontawesome|star-o' size={40} style={styles.star} color='#6A85B1'/>
              </View>

              <Text style={styles.reward}>{reward.name}</Text>
              <Text style={styles.buy}>BUY</Text>
              <TouchableHighlight>
                <Icon name='fontawesome|check-square-o' size={30} style={styles.rewardIcons} color='#6A85B1'/>
              </TouchableHighlight>
            </View>
          })}
          <View>
            <View style={styles.editTaskContainer}>
              <TouchableHighlight style={styles.editButton} underlayColor="#f7f7f7">
                <Text style={styles.editTaskText}>Edit Tasks</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.editTaskContainer}>
              <TouchableHighlight style={styles.editButton} underlayColor="#f7f7f7">
                <Text style={styles.editTaskText}>Create Task</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
})

module.exports = Payout;
