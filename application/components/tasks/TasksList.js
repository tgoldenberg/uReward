var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksEdit = require('./TasksEdit');
var Payout = require('../rewards/Payout');
var styles = require('../styles');
var { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, PickerIOS, Image, AsyncStorage } = React;
var PickerItemIOS = PickerIOS.Item;
var _ = require('underscore');
const ITEMS_KEY = '@uReward:items';


var TasksList = React.createClass({
  getInitialState: function() {
    return {inputText: "", createMode: false, selectedNum: 1};
  },
  componentDidUpdate: function() {
    this.setDefaultStars();
  },
  setDefaultStars: function() {
    var self = this;
    var items = _.compact(this.props.items);
    var changes = 0;
    items.forEach(function(item, idx){
      let today = self.props.date;
      if (item.datesStarred[today] == null) {
        items[idx].datesStarred[today] = 0;
        changes += 1;
      }
    });
    if (changes > 0) {
      console.log("NEEDS CHANGES", changes);
      self.props.changeItems(items);
    }
  },
  handleInputChange: function(e) {
    // TODO: change inputText state
    this.setState({inputText: e.nativeEvent.text});
  },
  addStar: function(e) {
    console.log("ADD STAR", this.props);
    var {items, date} = this.props;
    items[e].datesStarred[date] += 1;
    console.log(items[e].datesStarred);
    this.props.changeItems(items);
  },
  toggleCreateMode: function() {
    this.setState({createMode: !this.state.createMode});
  },
  decreaseStar: function(e) {
    console.log("DECREASE STAR", this.props);
    var {items, date} = this.props;
    if (items[e].datesStarred[date] > 0) {
      items[e].datesStarred[date] -= 1;
      console.log(items[e].datesStarred);
      this.props.changeItems(items);
    }

  },
  createNewTask: function() {
    console.log("CREATE TASK");
    if (this.state.inputText != "") {
      var {inputText, selectedNum} = this.state;
      this.props.createTask({name: inputText, stars: selectedNum, datesStarred: {}});
    }
    this.setState({createMode: false})
  },
  addAllStars: function(e) {
    console.log("ADD ALL STARS", this.props);
    var {items, date} = this.props;
    items[e].datesStarred[date] += items[e].stars;
    console.log(items[e].datesStarred);
    this.props.changeItems(items);
  },

  prevDate: function() {
    var date = new Date(this.props.date).valueOf();
    var prevDate = new Date(date - 24*60*60*1000);
    this.props.changeDate(prevDate);
  },
  nextDate: function() {
    var date = new Date(this.props.date).valueOf();
    var nextDate = new Date(date + 24*60*60*1000);
    this.props.changeDate(nextDate);
  },
  selectNum: function(e) {
    this.setState({selectedNum: e.nativeEvent.newValue});
  },

  payout: function() {
    console.log("PAYOUT", this.props);
    this.props.payout();
  },
  cancelCreate: function() {
    this.setState({createMode: false});
  },

  render: function() {
    var self = this;
    var isToday = this.props.date == new Date().toLocaleDateString() ? "Today " : "";
    var taskCreateContent;
    if (this.state.createMode) {
      taskCreateContent = <View><View style={styles.createTaskContainer}>
                            <TextInput style={styles.taskInput} value={this.state.inputText} onChange={this.handleInputChange} placeholder={"Task Name"}/>
                          </View>
                          <View style={styles.starsSelectContainer}>
                            <Text style={styles.selectStarText}># of Stars: {this.state.selectedNum}</Text>
                            <Icon name='fontawesome|star-o' size={40} style={styles.star} color='white'/>
                          </View>
                          <TouchableHighlight onPress={this.createNewTask}>
                            <View style={styles.editTaskContainer}>

                              <Text style={styles.editTaskText}>Create New Task</Text>
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
      taskCreateContent = <View>
                            <View style={styles.editTaskContainer}>
                              <TouchableHighlight style={styles.editButton} underlayColor="white" onPress={this.props.toggleEdit}>
                                <Text style={styles.editTaskText}>Edit Tasks</Text>
                              </TouchableHighlight>
                            </View>
                            <View style={styles.editTaskContainer}>
                              <TouchableHighlight style={styles.editButton} underlayColor="white" onPress={this.toggleCreateMode}>
                                <Text style={styles.editTaskText}>Create Task</Text>
                              </TouchableHighlight>
                            </View>
                          </View>
    }
    var items = _.compact(this.props.items);
    var changes = 0;
    var rewards = items.map(function(item, idx){
      var text = item.name ? item.name.substring(0,23): "";
      if (text.length == 23) { text += "..."; }
      let today = self.props.date;
      var todayStars = 0;
      console.log("THIS DATE", item.datesStarred[today]);
      if (item.datesStarred[today] != null) {
        todayStars = item.datesStarred[today];
      }
      var todayStars = item.datesStarred[today] ? item.datesStarred[today] : 0;
      var boundAddStar        =  self.addStar.bind(null, idx);
      var boundDecreaseStar   =  self.decreaseStar.bind(null, idx);
      var boundAddAllStars    =  self.addAllStars.bind(null, idx);
      var starBackground      =  todayStars > 0 ? "yellow" : "white"
      return  <View style={styles.rewardContainer} key={idx} ref={`item${idx}`}>
                <View style={styles.starContainer}>
                  <Icon name='fontawesome|star' size={40} style={styles.starFull} color={starBackground}/>
                  <Text style={styles.starText}>{todayStars}</Text>
                </View>
                <TouchableHighlight onPress={boundDecreaseStar}>
                  <Icon name='fontawesome|minus-square' size={30} style={styles.smallRewardIcons} color='#6A85B1' />
                </TouchableHighlight>
                <TouchableHighlight onPress={boundAddStar}>
                  <Icon name='fontawesome|plus-square' size={30} style={styles.smallRewardIcons} color='#6A85B1' />
                </TouchableHighlight>
                <Text style={styles.reward}>{text}</Text>
                <Text style={styles.rewardStars}>({item.stars} stars)</Text>
                <TouchableHighlight onPress={boundAddAllStars}>
                  <Icon name='fontawesome|check-square-o' size={30} style={styles.rewardIcons} color='#6A85B1'/>
                </TouchableHighlight>
              </View>;
      });
      if (changes > 0) {
        console.log("NEEDS CHANGES", changes);
        self.props.changeItems(items);
      }
      var buttonAction;
      var buttonText;
      if (! this.state.createMode) {
        buttonAction = this.payout;
        buttonText = "Payout";
      } else {
        buttonAction = this.cancelCreate;
        buttonText = "Cancel"
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
                <View style={styles.payoutButton}>
                <TouchableHighlight
                  underlayColor="#bbb"
                  onPress={buttonAction}
                  style={styles.payoutContainer}>
                  <Text style={styles.payoutText}>{buttonText}</Text>
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
            <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center', flex: 8}}>{isToday} {new Date(this.props.date).toDateString()}</Text>
            <TouchableHighlight underlayColor="#CCC" onPress={this.nextDate}>
              <Icon name='fontawesome|angle-right' size={40} style={styles.calendarSigns} color='black'/>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView style={styles.scrollView} contentInset={{bottom:49}} automaticallyAdjustContentInsets={false}>

          {rewards}
          {taskCreateContent}

        </ScrollView>
      </View>
    )
  }
});

module.exports = TasksList;
