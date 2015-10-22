const React = require('react-native');
let Icon = require('react-native-vector-icons/MaterialIcons');
let FAIcon = require('react-native-vector-icons/FontAwesome');
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
      selectedNum: 5,
      selectedPicker: "5 stars",
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
        selectedNum: 5,
        selectedPicker: "5 stars"
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
                              <TouchableHighlight style={styles.editTaskContainer} onPress={this.createNewReward} underlayColor={Colors.lightBlue}>
                                <Text style={styles.editTaskText}>Create New Reward</Text>
                              </TouchableHighlight>
                              <View style={styles.createTaskContainer}>
                                <TextInput
                                  ref="taskName"
                                  onFocus={()=> {
                                    setTimeout(() => {
                                      let scrollResponder = this.refs.scrollView.getScrollResponder();
                                      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                                        React.findNodeHandle(this.refs["taskName"]),
                                        200, //additionalOffset
                                        true
                                      );
                                    }, 50);
                                  }}
                                  style={styles.taskInput}
                                  value={this.state.inputText}
                                  onChange={this.handleInputChange} placeholder={"Task Name"}/>
                              </View>
                              <View style={styles.starsSelectContainer}>
                                <Text style={styles.selectStarText}># of Stars: {this.state.selectedNum}</Text>
                                <FAIcon name='star' size={25} style={styles.star} color={Colors.yellow}/>
                              </View>

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
        <View style={{flexDirection: 'row', height: 80, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon name='account-box' size={80} color={Colors.regularBlue}/>
            <View style={{flexDirection: 'column', alignItems: 'stretch', flex: 1}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 2, marginTop: 10, flex: 1, textAlign: 'center'}}>
                {this.props.username}
              </Text>
                {cancelButton}
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
          ref="scrollView"
          style={styles.scrollView}
          contentInset={{bottom:0}}
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}>
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
