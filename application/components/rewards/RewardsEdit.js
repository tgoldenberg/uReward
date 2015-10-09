var _ = require('underscore');
var React = require('react-native');
var { Icon, } = require('react-native-icons');
var styles = require('../styles');
var _ = require('underscore');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  AsyncStorage
} = React;

var RewardsEdit = React.createClass({
  deleteReward: function(id) {
    console.log("DELETE REWARD", id);
    this.props.deleteReward(id);
  },

  render: function() {
    var self = this;
    var rewards = _.compact(this.props.rewards);
    var rewards = rewards.map(function(reward, idx){
      var boundDelete = self.deleteReward.bind(null, idx);
      console.log("PROPS", self.props);
      return  <View style={styles.rewardContainer} key={idx}>
                <TouchableHighlight underlayColor="transparent" onPress={boundDelete}>
                  <Icon name='fontawesome|times' size={30} style={styles.times} color='#777'/>
                </TouchableHighlight>
                <View style={styles.starContainer}>
                  <Text style={styles.starText}>{reward.stars}</Text>
                  <Icon name='fontawesome|star-o' size={40} style={styles.star} color='#6A85B1'/>
                </View>
                <Text style={styles.reward}>{reward.name}</Text>
                <Icon name='fontawesome|bars' size={30} style={styles.rewardIcons} color='#6A85B1'/>
              </View>;
      });
    return (
      <View>
        <View style={{flexDirection: 'row', height: 100, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='fontawesome|user' size={40} style={styles.facebook} color='black'/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 20, marginRight: 10, marginTop: 20, flex: 1, textAlign: 'center'}}>{this.props.username}</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#b4b4b4', flex: 0.5}} >
            <Text style={{flex: 2, padding: 15, fontSize: 18, backgroundColor: '#a7a7a7' }}>Stars This Week: {this.props.starsThisWeek}</Text>
            <Text style={{flex: 1, padding: 15, fontSize: 18 }}>Total Stars: {this.props.total}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{bottom:49}} automaticallyAdjustContentInsets={false}>
          <View style={styles.editTaskContainer}>
            <TouchableHighlight style={styles.editButton} underlayColor="white" onPress={this.props.toggleEdit}>
              <Text style={styles.editTaskText}>Done</Text>
            </TouchableHighlight>
          </View>
          {rewards}
        </ScrollView>
      </View>
    )
  }
});

module.exports = RewardsEdit;
