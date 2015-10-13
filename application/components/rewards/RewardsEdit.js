var _ = require('underscore');
var React = require('react-native');
var { Icon, } = require('react-native-icons');
var styles = require('../styles');
var _ = require('underscore');
let Colors = require('../colors');

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
                <TouchableHighlight underlayColor="#d6d6d6" onPress={boundDelete}>
                  <Icon name='fontawesome|times' size={30} style={styles.times} color={Colors.blue}/>
                </TouchableHighlight>
                <View style={styles.starContainer}>
                  <Icon name='fontawesome|star' size={40} style={styles.star} color={Colors.yellow}/>
                  <Text style={styles.starText}>{reward.stars}</Text>
                </View>
                <Text style={styles.reward}>{reward.name}</Text>
                <Icon name='fontawesome|bars' size={30} style={styles.rewardIcons} color={Colors.blue}/>
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
          <View style={{backgroundColor: '#888', flex: 0.5}} >
            <Text style={{color: 'white', flex: 1, padding: 15, fontSize: 18, backgroundColor: '#999' }}>Stars This Week: {this.props.starsThisWeek}</Text>
            <Text style={{color: 'white', flex: 1, padding: 15, fontSize: 18 }}>Total Stars: {this.props.total}</Text>
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentInset={{bottom:49}}
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}>
          <TouchableHighlight style={styles.editTaskContainer} underlayColor={Colors.lightBlue} onPress={this.props.toggleEdit}>
            <Text style={styles.editTaskText}>Done</Text>
          </TouchableHighlight>
          {rewards}
        </ScrollView>
      </View>
    )
  }
});

module.exports = RewardsEdit;
