var _ = require('underscore');
var React = require('react-native');
let Icon = require('react-native-vector-icons/MaterialIcons');
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
                  <Icon name='fontawesome|times' size={30} style={styles.times} color={"#777"}/>
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
        <View style={{flexDirection: 'row', height: 80, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='account-box' size={80} color={Colors.regularBlue}/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 2, marginTop: 10, flex: 1, textAlign: 'center'}}>
                {this.props.username}
              </Text>
                
            </View>
          </View>
          <View style={{backgroundColor: '#888', flex: 0.5}} >
            <Text style={{color: 'white', flex: 2, padding: 5, paddingTop: 12, fontSize: 14, backgroundColor: '#999' }}>
              Stars This Week: {this.props.starsThisWeek}
            </Text>
            <Text style={{color: 'white', flex: 2, padding: 5, paddingTop: 12, fontSize: 14 }}>
              Total Stars: {this.props.total}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: 45}}>
          <View style={{backgroundColor: '#f7f7f7', flex: 1, flexDirection: 'row'}} >
            <Text style={{fontSize: 16, marginTop: 10, color: "#333", textAlign: 'center', flex: 8}}>Rewards</Text>
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
