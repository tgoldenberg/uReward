const ITEMS_KEY       = '@uReward:items';
const React           = require('react-native');
const Colors          = require('../colors');
let { Icon, }         = require('react-native-icons');
let TasksEdit         = require('./TasksEdit');
let Payout            = require('../rewards/Payout');
let styles            = require('../styles');
let _                 = require('underscore');
let TaskPicker        = require('../taskPicker');
let TaskItem          = require('./TaskItem');
let {
  View,
  Text,
  Animated,
  Easing,
  TextInput,
  TouchableHighlight,
  ScrollView,
  PickerIOS,
  Image,
  AsyncStorage
} = React;
let PickerItemIOS = PickerIOS.Item;

var TasksList = React.createClass({
  getInitialState: function() {
    return {
      inputText: "",
      createMode: false,
      selectedNum: 5,
      selectedPicker: "5 stars",
    };
  },

  componentDidUpdate: function() {
    this.setDefaultStars();
  },
  setDefaultStars: function() {
    let self = this;
    let items = _.compact(this.props.items);
    let changes = 0;
    items.forEach(function(item, idx){
      let today = self.props.date;
      if (item.datesStarred[today] == null) {
        items[idx].datesStarred[today] = 0;
        changes += 1;
      }
    });
    if (changes > 0)
      self.props.changeItems(items);
  },
  handleInputChange: function(e) {
    this.setState({inputText: e.nativeEvent.text});
  },
  addStar: function(e) {
    let {items, date, total} = this.props;
    items[e].datesStarred[date] += 1;
    this.props.changeTotal(items, total+1);
  },
  toggleCreateMode: function() {
    this.setState({createMode: !this.state.createMode});
  },
  decreaseStar: function(e) {
    let {items, date, total} = this.props;
    if (items[e].datesStarred[date] > 0) {
      items[e].datesStarred[date] -= 1;
      var diff = total > 0 ? 1 : 0
      this.props.changeTotal(items, total-diff);
    }
  },
  createNewTask: function() {
    // console.log("CREATE TASK");
    if (this.state.inputText != "") {
      let {inputText, selectedNum} = this.state;
      this.props.createTask({
        name: inputText,
        stars: selectedNum,
        datesStarred: {}
      });
    }
    this.setState({
      createMode: false,
      inputText: "",
      selectedNum: 1,
      selectedPicker: "1 star"
    })
  },
  addAllStars: function(e) {
    // console.log("ADD ALL STARS", this.props);
    let {items, date, total} = this.props;
    items[e].datesStarred[date] += items[e].stars;
    this.props.changeTotal(items, total+=items[e].stars);

  },
  prevDate: function() {
    let date = new Date(this.props.date).valueOf();
    let prevDate = new Date(date - 24*60*60*1000);
    this.props.changeDate(prevDate);
  },
  nextDate: function() {
    let date = new Date(this.props.date).valueOf();
    let nextDate = new Date(date + 24*60*60*1000);
    this.props.changeDate(nextDate);
  },
  selectNum: function(e) {
    this.setState({
      selectedNum: e.nativeEvent.newIndex+1,
      selectedPicker: e.nativeEvent.newValue
    });
  },
  payout: function() {
    // console.log("PAYOUT", this.props);
    this.props.payout();
  },
  cancelCreate: function() {
    this.setState({createMode: false});
  },
  render: function() {
    let self = this;
    let isToday = this.props.date == new Date().toLocaleDateString() ? "Today " : "";
    let taskCreateContent;
    if (this.state.createMode) {
      taskCreateContent = <View style={styles.pickerMainContainer}>
                            <TouchableHighlight
                              onPress={this.createNewTask}
                              underlayColor={Colors.lightBlue}
                              style={styles.editTaskContainer}
                              >
                              <Text style={styles.editTaskText}>Create New Task</Text>
                            </TouchableHighlight>
                            <View style={styles.createTaskContainer}>
                              <TextInput style={styles.taskInput} value={this.state.inputText} onChange={this.handleInputChange} placeholder={"Task Name"}/>
                            </View>
                            <View style={styles.starsSelectContainer}>
                              <Text style={styles.selectStarText}># of Stars: {this.state.selectedNum}</Text>
                              <Icon name='fontawesome|star' size={25} style={styles.star} color={Colors.yellow}/>
                            </View>

                            <View style={styles.pickerContainer}>
                              <PickerIOS style={styles.pickerIOS} selectedValue={this.state.selectedPicker} onChange={this.selectNum}>
                                {TaskPicker.map((num) => (
                                  <PickerItemIOS style={styles.pickerItem} color={"white"} key={num} value={num} label={num.toString()}/>
                                ))}
                              </PickerIOS>
                            </View>

                          </View>
    } else {
      taskCreateContent = <View style={styles.editButtonsContainer}>
                            <TouchableHighlight
                              style={styles.editTaskContainer}
                              underlayColor={Colors.lightBlue}
                              onPress={this.props.toggleEdit}>
                              <Text style={styles.editTaskText}>Edit Tasks</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                              style={styles.editTaskContainer}
                              underlayColor={Colors.lightBlue}
                              onPress={this.toggleCreateMode}>
                              <Text style={styles.editTaskText}>Create Task</Text>
                            </TouchableHighlight>
                          </View>
    }
    let items = _.compact(this.props.items);
    let changes = 0;
    let rewards = items.map(function(item, idx){
      let text = item.name ? item.name.substring(0,23): "";
      if (text.length == 23) { text += "..."; }
      let today = self.props.date;
      let todayStars = 0;
      if (item.datesStarred[today] != null) {
        todayStars = item.datesStarred[today];
      }
      let boundAddStar        =  self.addStar.bind(null, idx);
      let boundDecreaseStar   =  self.decreaseStar.bind(null, idx);
      let boundAddAllStars    =  self.addAllStars.bind(this, idx);
      let starBackground      =  todayStars > 0 ? Colors.yellow : "white"
      return  <TaskItem
                key={idx}
                todayStars={todayStars}
                addStar={boundAddStar}
                decreaseStar={boundDecreaseStar}
                addAllStars={boundAddAllStars}
                starBackground={starBackground}
                text={text}
                stars={item.stars}
                />
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
      <View style={{flex: 1}}>
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
                    onPress={buttonAction}
                    style={styles.payoutContainer}>
                    <Text style={styles.payoutText}>{buttonText}</Text>
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
          contentInset={{bottom:99}}
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}>
          {rewards}

        {taskCreateContent}
        </ScrollView>
      </View>
    )
  }
});

module.exports = TasksList;
