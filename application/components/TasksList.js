var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksEdit = require('./TasksEdit');
var styles = require('./styles');
var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  PickerIOS,
  Image,
  AsyncStorage
} = React;

var PickerItemIOS = PickerIOS.Item;

ITEMS_KEY_TODAY = `@uReward:itemsToday`;
var TasksList = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      createMode: false,
      inputText: "",
      numStars: 0,
      selectedNum: 1,
    }
  },
  componentDidMount: function() {
    this._loadInitialState().done();
    // var items = this.props.rewards.map(function(item) {
    //   return {item: item, stars: 0};
    // })
    // AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
  },
  handleInputChange: function(e) {
    // TODO: change inputText state
    this.setState({inputText: e.nativeEvent.text});
  },
  async _loadInitialState() {
    try {
      var items = await AsyncStorage.getItem(ITEMS_KEY_TODAY);
      if (items !== null && items.length > 0 ) {
        console.log("FOUND DAILY CHART", items);
        this.setState({items: JSON.parse(items)})
      } else {
        console.log("NO CURRENT ITEMS")
        var items = this.props.rewards.map(function(item) {
          return {item: item, stars: 0};
        })
        if (items.length > 0){
          AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
          this.setState({items: items});
        }
      }
    } catch (error) {
    }
  },
  addStar: function(e) {
    console.log("ADD STAR");
    var {items} = this.state;
    items[e].stars += 1;
    AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
    this.setState({items: items});
    this.props.changeTotal(1);
  },
  toggleCreateMode: function() {
    this.setState({createMode: !this.state.createMode});
  },
  decreaseStar: function(e) {
    console.log("DECREASE STAR");
    var {items} = this.state;
    if (items[e].stars > 0) {
      items[e].stars -= 1;
      AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
      this.setState({items: items});
      this.props.changeTotal(-1);
    }
  },
  createNewTask: function() {
    if (this.state.inputText != "") {
      var {inputText, selectedNum, items} = this.state;
      items.push({item: {name: inputText, stars: selectedNum}, stars: 0});
      AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
      this.setState({items: items, inputText: "", selectedNum: 1, createMode: false});
      this.props.createTask(items);
    }
  },
  addAllStars: function(id) {
    console.log("ADD ALL STARS");
    var {items} = this.state;
    var starAmount = items[id].item.stars;
    items[id].stars += starAmount;
    AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
    this.props.changeTotal(starAmount);
  },
  selectNum: function(e) {
    this.setState({selectedNum: e.nativeEvent.newValue});
  },
  chooseNum: function(e) {
    debugger
  },
  render: function() {
    var self = this;
    var taskCreateContent;
    if (this.state.createMode) {

      taskCreateContent = <View><View style={styles.createTaskContainer}>
                            <TextInput style={styles.taskInput} value={this.state.inputText} onChange={this.handleInputChange} placeholder={"Task Name"}/>
                          </View>
                          <View style={styles.editTaskContainer}>
                            <Text style={styles.editTaskText}># of Stars: {this.state.selectedNum}</Text>
                          </View>
                          <TouchableHighlight onPress={this.createNewTask}>
                            <View style={styles.editTaskContainer}>
                              <Text style={styles.editTaskText}>Create New Task</Text>
                            </View>
                          </TouchableHighlight>
                          <View>
                            <PickerIOS
                              selectedValue={this.state.selectedNum}
                              onChange={this.selectNum}
                              >
                              {[0,1,2,3,4,5,6,7,8,9].map((num) => (
                                <PickerItemIOS
                                  key={num}
                                  value={num}
                                  label={num.toString()}
                                  />
                              )
                            )}
                            </PickerIOS>
                          </View></View>
    } else {
      taskCreateContent = <View>
                            <View style={styles.editTaskContainer}>
                              <TouchableHighlight
                                style={styles.editButton}
                                underlayColor="white"
                                onPress={this.props.toggleEdit}
                                >
                                <Text style={styles.editTaskText}>
                                  Edit Tasks
                                </Text>
                              </TouchableHighlight>
                            </View>
                            <View style={styles.editTaskContainer}>
                              <TouchableHighlight
                                style={styles.editButton}
                                underlayColor="white"
                                onPress={this.toggleCreateMode}
                                >
                                <Text style={styles.editTaskText}>
                                  Create Task
                                </Text>
                              </TouchableHighlight>
                            </View>
                          </View>
    }
    var rewards = this.state.items.map(function(reward, idx){
      var text = reward.item.name.substring(0,23);
      if (text.length == 23) {
        text += "...";
      }
      var boundAddStar        =  self.addStar.bind(null, idx);
      var boundDecreaseStar   =  self.decreaseStar.bind(null, idx);
      var boundAddAllStars    =  self.addAllStars.bind(null, idx)
      return  <View style={styles.rewardContainer} key={idx} ref={`item${idx}`}>
                <View style={styles.starContainer}>
                  <Text style={styles.starText}>{reward.stars}</Text>
                  <Icon
                    name='fontawesome|star-o'
                    size={40}
                    style={styles.star}
                    color='#6A85B1'
                    ></Icon>
                </View>
                <TouchableHighlight
                  onPress={boundDecreaseStar}
                  >
                  <Icon
                    name='fontawesome|minus-square'
                    size={30}
                    style={styles.smallRewardIcons}
                    color='#6A85B1'
                    />
                </TouchableHighlight>
                <TouchableHighlight ref={`add${idx}`}
                  onPress={boundAddStar}
                  >
                  <Icon
                    name='fontawesome|plus-square'
                    size={30}
                    style={styles.smallRewardIcons}
                    color='#6A85B1'
                    />
                </TouchableHighlight>
                <Text style={styles.reward}>{text}</Text>
                <Text style={styles.rewardStars}>({reward.item.stars} stars)</Text>
                <TouchableHighlight
                  onPress={boundAddAllStars}
                  >
                  <Icon
                    name='fontawesome|check-square-o'
                    size={30}
                    style={styles.rewardIcons}
                    color='#6A85B1'
                    />
                </TouchableHighlight>
              </View>;
      });
    return (
      <View>
        <View style={{flexDirection: 'row', height: 100, marginTop: 60}}>
          <View style={{backgroundColor: '#e6e6e6', flex: 0.5, flexDirection: 'row'}} >
            <Icon
              name='fontawesome|user'
              size={40}
              style={styles.facebook}
              color='black'
              >
            </Icon>

          <Text style={{fontSize: 20, marginLeft: 10, marginTop: 20, flex: 2}}>
              {this.props.username}
            </Text>
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
            <Icon
              name='fontawesome|angle-left'
              size={40}
              style={styles.calendarSigns}
              color='black'
              />
            <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center', flex: 8}}>
               Today {new Date().toDateString()}
            </Text>
            <Icon
              name='fontawesome|angle-right'
              size={40}
              style={styles.calendarSigns}
              color='black'
              />
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentInset={{bottom:49}}
          automaticallyAdjustContentInsets={false}
          >
          {rewards}
          {taskCreateContent}
        </ScrollView>
      </View>
    )
  }
});

module.exports = TasksList;
