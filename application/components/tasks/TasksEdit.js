const _               = require('underscore');
const React           = require('react-native');
let { Icon, }         = require('react-native-icons');
let styles            = require('../styles');
let Colors            = require('../colors');

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

const ITEMS_KEY = '@uReward:items';
const TOTAL = '@uReward:total';

var TasksEdit = React.createClass({
  deleteTask: function(id) {
    console.log("DELETE TASK", id);
    this.props.deleteTask(id);
  },

  render: function() {
    var self = this;
    let isToday = this.props.date == new Date().toLocaleDateString() ? "Today " : "";
    var items = _.compact(this.props.items);
    var today = new Date(this.props.date).toDateString();
    var rewards = items.map(function(reward, idx){
      var text = reward.name.substring(0,23);
      if (text.length == 23) {
        text += "...";
      }

      var boundDelete = self.deleteTask.bind(null, idx);
      let starBackground =  reward.datesStarred[self.props.date] > 0 ? Colors.yellow : "white"
      // console.log("PROPS", self.props);
      return  <View style={styles.rewardContainer} key={idx}>
                <TouchableHighlight underlayColor="#d6d6d6" onPress={boundDelete}>
                  <Icon name='fontawesome|times' size={30} style={styles.times} color='#777'/>
                </TouchableHighlight>
                <View style={styles.editStarContainer}>
                  <Icon name='fontawesome|star' size={30} style={styles.star} color={starBackground}/>
                  <Text style={styles.starText}>{reward.datesStarred[self.props.date]}</Text>
                </View>
                <Text style={styles.reward}>{text}</Text>
                <Text style={styles.rewardStars}>({reward.stars} stars)</Text>
                <Icon name='fontawesome|bars' size={30} style={styles.rewardIcons} color='#6A85B1'/>
              </View>;
      });
    return (
      <View>
        <View style={{flexDirection: 'row', height: 80, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='fontawesome|user' size={40} style={styles.facebook} color='black'/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 2, marginTop: 10, flex: 1, textAlign: 'center'}}>
                {this.props.username}
              </Text>
                <View style={styles.payoutButton}>
                  <TouchableHighlight
                    underlayColor={Colors.lightBlue}
                    style={styles.payoutContainer}>
                    <Text style={styles.payoutText}>Payout</Text>
                  </TouchableHighlight>
                </View>
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
            <TouchableHighlight underlayColor="#CCC" onPress={this.prevDate}>
              <Icon name='fontawesome|angle-left' size={40} style={styles.calendarSigns} color='#777'/>
            </TouchableHighlight>
            <Text style={{fontSize: 16, marginTop: 12, textAlign: 'center', flex: 8, color: "#333"}}>{isToday} {new Date(this.props.date).toDateString()}</Text>
            <TouchableHighlight underlayColor="#CCC" onPress={this.nextDate}>
              <Icon name='fontawesome|angle-right' size={40} style={styles.calendarSigns} color='#777'/>
            </TouchableHighlight>
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

module.exports = TasksEdit;
