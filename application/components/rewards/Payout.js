var React = require('react-native');
let Icon = require('react-native-vector-icons/MaterialIcons');
var styles = require('../styles');
var _ = require('underscore');
var RewardsList = require('./RewardsList');
var RewardsEdit = require('./RewardsEdit');
var { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
var PickerItemIOS = PickerIOS.Item;
const REWARDS = '@uReward:rewards';

var Payout = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
      rewards: []
    }
  },

  componentDidMount() {
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    let rewards = await AsyncStorage.getItem(REWARDS);
    if (rewards != null) {
      console.log("FOUND REWARDS", rewards);
      this.setState({rewards: JSON.parse(rewards)});
    }
  },

  buyReward: function(reward) {
    console.log("BUY BUY", reward);
    console.log("REWARDS", this.state.rewards)
    var rewards = _.compact(this.state.rewards.map((reward) => {if (reward.deleted == false) return reward;} ));
    var today = new Date().toLocaleDateString();
    rewards[reward.id].datesPurchased[today] = new Date().toLocaleTimeString();
    this.setState({rewards: rewards});
    AsyncStorage.setItem(REWARDS, JSON.stringify(rewards));
    this.props.reduceStars(reward.stars);
  },

  toggleEdit: function() {
    this.setState({edit: ! this.state.edit});
  },

  deleteReward: function(id){
    var rewards = _.compact(this.state.rewards.map((reward,index)=> {
      if (reward.deleted != true)
        return reward;
    }));
    rewards[id].deleted = true;
    console.log("NEW REWARDS", rewards);
    this.setState({rewards: rewards});
    AsyncStorage.setItem(REWARDS, JSON.stringify(rewards));
  },

  createReward: function(reward) {
    var rewards = this.state.rewards;
    rewards.push(reward);
    this.setState({rewards: rewards});
    AsyncStorage.setItem(REWARDS, JSON.stringify(rewards));
  },

  render: function() {
    var content;
    var nonDeletedRewards = this.state.rewards.map((reward, index) => {
      if (reward.deleted == false) return reward;
    });
    if (!this.state.edit) {
      content = <RewardsList
                  rewards={_.compact(nonDeletedRewards)}
                  username={this.props.username}
                  total={this.props.total}
                  starsThisWeek={this.props.starsThisWeek}
                  createReward={this.createReward}
                  buyReward={this.buyReward}
                  editRewards={this.props.editRewards}
                  toggleEdit={this.toggleEdit}
                  />;
    } else {
      content = <RewardsEdit
                  rewards={_.compact(nonDeletedRewards)}
                  username={this.props.username}
                  total={this.props.total}
                  starsThisWeek={this.props.starsThisWeek}
                  createReward={this.props.createReward}
                  editRewards={this.props.editRewards}
                  toggleEdit={this.toggleEdit}
                  deleteReward={this.deleteReward}
                  />;
    }
    return (
      <View>{content}</View>
    )
  }
})

module.exports = Payout;
