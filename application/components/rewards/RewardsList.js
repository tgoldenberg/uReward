const React = require('react-native');
const { Icon, } = require('react-native-icons');
let Payout = require('./Payout');
let styles = require('../styles');
let RewardItem = require('./RewardItem');
let Colors = require('../colors');
let { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
let PickerItemIOS = PickerIOS.Item;
let _ = require('underscore');
let TaskPicker = require('../taskPicker');

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
    this.setState({
      selectedNum: e.nativeEvent.newIndex+1,
      selectedPicker: e.nativeEvent.newValue
    });
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
      this.setState({
        createMode: false,
        inputText: "",
        selectedNum: 1,
        selectedPicker: "1 star"
      })
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
                          underlayColor={Colors.lightBlue}
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
      rewardCreateContent = <View>
                              <View style={styles.createTaskContainer}>
                                <TextInput style={styles.taskInput} value={this.state.inputText} onChange={this.handleInputChange} placeholder={"Task Name"}/>
                              </View>
                              <View style={styles.starsSelectContainer}>
                                <Text style={styles.selectStarText}># of Stars: {this.state.selectedNum}</Text>
                                <Icon name='fontawesome|star' size={40} style={styles.star} color={Colors.yellow}/>
                              </View>
                              <TouchableHighlight style={styles.editTaskContainer} onPress={this.createNewReward} underlayColor={Colors.lightBlue}>
                                <Text style={styles.editTaskText}>Create New Reward</Text>
                              </TouchableHighlight>
                              <View style={styles.pickerContainer}>
                                <PickerIOS style={styles.rewardsPickerIOS} selectedValue={this.state.selectedPicker} onChange={this.selectNum}>
                                  {TaskPicker.map((num) => (
                                    <PickerItemIOS style={styles.pickerItem} color={"white"} key={num} value={num} label={num.toString()}/>
                                  ))}
                                </PickerIOS>
                              </View>
                            </View>

    } else {
      rewardCreateContent = <View>
                              <TouchableHighlight style={styles.editTaskContainer} underlayColor={Colors.lightBlue} onPress={this.props.toggleEdit}>
                                <Text style={styles.editTaskText}>Edit Rewards</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={styles.editTaskContainer} underlayColor={Colors.lightBlue} onPress={this.toggleCreateMode}>
                                <Text style={styles.editTaskText}>Create Reward</Text>
                              </TouchableHighlight>
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
          <View style={{backgroundColor: '#888', flex: 0.5}} >
            <Text style={{color: 'white', flex: 1, padding: 15, fontSize: 18, backgroundColor: '#999' }}>
              Stars This Week: {this.props.starsThisWeek}
            </Text>
            <Text style={{color: 'white', flex: 1, padding: 15, fontSize: 18 }}>
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
            return (
              <RewardItem
                stars={reward.stars}
                name={reward.name}
                buyReward={boundBuyReward}
                total={this.props.total}
                key={idx}
                />
            )
          })}
          {rewardCreateContent}
        </ScrollView>
      </View>
    )
  }
});

module.exports = RewardsList;
