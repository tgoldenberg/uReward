var React = require('react-native');
var { Icon, } = require('react-native-icons');
var Payout = require('./Payout');
var styles = require('../styles');
var { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
var PickerItemIOS = PickerIOS.Item;
var _ = require('underscore');
const ITEMS_KEY = '@uReward:items';


var RewardsList = React.createClass({
  getInitialState: function() {
    return {
      inputText: "",
      createMode: false,
      selectedNum: 1,
    };
  },
  buyReward: function(reward) {
    console.log("BUY", reward);
    if (this.props.total >= reward.stars) {
      console.log("WENT THROUGH")
      this.props.buyReward(reward);
    }
  },
  toggleCreateMode: function() {
    this.setState({createMode: ! this.state.createMode});
  },
  handleInputChange: function(e) {
    this.setState({inputText: e.nativeEvent.text});
  },
  selectNum: function(e) {
    this.setState({selectedNum: e.nativeEvent.newValue});
  },
  createNewReward: function() {
    if (this.state.inputText != "") {
      var reward = {
        name: this.state.inputText,
        stars: this.state.selectedNum,
        deleted: false,
        datesPurchased: {}
      };
      this.props.createReward(reward);
      this.setState({createMode: false})
    }
  },
  cancelCreate: function() {
    this.setState({createMode: false});
  },

  render: function() {
    var self = this;
    var cancelButton;
    if (this.state.createMode) {
      cancelButton = <View style={styles.payoutButton}>
                        <TouchableHighlight
                          underlayColor="#bbb"
                          onPress={this.cancelCreate}
                          style={styles.payoutContainer}>
                          <Text style={styles.payoutText}>Cancel</Text>
                        </TouchableHighlight>
                      </View>
    } else {
      cancelButton = <View></View>
    }
    var rewardCreateContent;
    if (this.state.createMode) {
      rewardCreateContent = <View><View style={styles.createTaskContainer}>
                            <TextInput style={styles.taskInput} value={this.state.inputText} onChange={this.handleInputChange} placeholder={"Task Name"}/>
                          </View>
                          <View style={styles.editTaskContainer}>
                            <Text style={styles.editTaskText}># of Stars: {this.state.selectedNum}</Text>
                          </View>
                          <TouchableHighlight onPress={this.createNewReward}>
                            <View style={styles.editTaskContainer}>
                              <Text style={styles.editTaskText}>Create New Reward</Text>
                            </View>
                          </TouchableHighlight>
                          <View>
                            <PickerIOS selectedValue={this.state.selectedNum} onChange={this.selectNum}>
                              {[0,1,2,3,4,5,6,7,8,9].map((num) => (
                                <PickerItemIOS key={num} value={num} label={num.toString()}/>
                              ))}
                            </PickerIOS>
                          </View></View>

    } else {
      rewardCreateContent = <View>
                              <View style={styles.editTaskContainer}>
                                <TouchableHighlight style={styles.editButton} underlayColor="white" onPress={this.props.toggleEdit}>
                                  <Text style={styles.editTaskText}>Edit Rewards</Text>
                                </TouchableHighlight>
                              </View>
                              <View style={styles.editTaskContainer}>
                                <TouchableHighlight style={styles.editButton} underlayColor="white" onPress={this.toggleCreateMode}>
                                  <Text style={styles.editTaskText}>Create Reward</Text>
                                </TouchableHighlight>
                              </View>
                            </View>
    }
    return (
      <View>
        <View style={{flexDirection: 'row', height: 100, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='fontawesome|user' size={40} style={styles.facebook} color='black'/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 20, marginRight: 10, marginTop: 20, flex: 1, textAlign: 'center'}}>
                {this.props.username}
              </Text>
              {cancelButton}
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
            var boundBuyReward = this.buyReward.bind(this, {id: idx, stars: reward.stars});
            return <View style={styles.rewardContainer} key={idx} ref={`item${idx}`}>
              <View style={styles.starContainer}>
                <Text style={styles.starText}>{reward.stars}</Text>
                <Icon name='fontawesome|star-o' size={40} style={styles.star} color='#6A85B1'/>
              </View>

              <Text style={styles.reward}>{reward.name}</Text>
              <Text style={styles.buy}>BUY</Text>
              <TouchableHighlight onPress={boundBuyReward}>
                <Icon name='fontawesome|check-square-o' size={30} style={styles.rewardIcons} color='#6A85B1'/>
              </TouchableHighlight>
            </View>
          })}
          {rewardCreateContent}
        </ScrollView>
      </View>
    )
  }
});

module.exports = RewardsList;
