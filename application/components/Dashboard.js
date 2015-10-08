let React = require('react-native');
let { Icon, } = require('react-native-icons');
let TasksList = require('./TasksList');
let TasksEdit = require('./TasksEdit');
let Payout = require('./Payout');
let _ = require('underscore');
let styles = require('./styles');
let { View, Text, TextInput, TouchableHighlight, ScrollView, AsyncStorage, Image } = React;
const ITEMS_KEY = '@uReward:items';
const REWARDS = '@uReward:rewards';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      items: [],
      date: new Date().toLocaleDateString(),
      today: new Date().toLocaleDateString(),
      total: 0,
      starsThisWeek: 0,
      rewards: [{
        name: "ice cream", stars: 5, datesPurchased: {}
      }]
     }
  }
  componentDidMount() {
    this._loadInitialState().done();
  }

  setTotal() {
    var totalStars = 0;
    this.state.items.forEach(function(item){
      var keys = _.keys(item.datesStarred);
      keys.forEach(function(key){
        totalStars += item.datesStarred[key];
      });
    });

    this.setState({total: totalStars});
  }

  setStarsThisWeek() {
    var starsThisWeek = 0;
    var today = new Date();
    var sunday;
    if (today.getDay() == 0) {
      sunday = today;
    } else {
      var days = today.getDay();
      sunday = new Date(today - 24*60*60*1000*days);
    }
    var week = [
      sunday.toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*1).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*2).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*3).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*4).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*5).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*6).toLocaleDateString(),
    ]
    console.log("WEEK", week);
    this.state.items.forEach(function(item) {
      week.forEach(function(day){
        if (item.datesStarred[day] != null) {
          starsThisWeek += item.datesStarred[day];
        }
      })
    });
    this.setState({starsThisWeek: starsThisWeek })
  }
  async _loadInitialState() {
    let items = await AsyncStorage.getItem(ITEMS_KEY);
    let rewards = await AsyncStorage.getItem(REWARDS);
    if (items != null) {
      console.log("FOUND ITEMS", items);
      this.setState({items: JSON.parse(items) });
      this.setStarsThisWeek();
      this.setTotal();
    }
    if (rewards != null) {
      console.log("FOUND REWARDS", rewards);
      this.setState({rewards: JSON.parse(rewards)});
    }
  }

  changeItems(items) {
    console.log(items[0].datesStarred)
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    this.setState({items: items});
    this.setStarsThisWeek();
    this.setTotal();
  }

  createReward(reward) {
    console.log("CREATE REWARD", reward);
  }

  createTask(item) {
    var {items} = this.state;
    item.datesStarred[this.state.date] = 0;
    item.deleted = false;
    items.push(item);
    this.setState({items: items});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  toggleEdit() {
    var {edit} = this.state;
    this.setState({edit: !edit});
    console.log("TOGGLE EDIT MODE", this.state.edit);
  }

  deleteTask(id) {
    var items = _.compact(this.state.items);
    items[id].deleted = true;
    console.log("NEW ITEMS", items);
    this.setState({items: items});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  changeDate(date) {
    console.log("NEW DATE", date);
    this.setState({date: date.toLocaleDateString()});
  }
  payout() {
    console.log("CHANGE ROUTE TO PAYOUT")
    var starsThisWeek = this.state.starsThisWeek;
    var total = this.state.total;
    this.props.navigator.push({
      title: 'Payout',
      component: Payout,
      passProps: {
        total: total,
        starsThisWeek: starsThisWeek,
        username: this.props.username,
        rewards: this.state.rewards
      }
    });
  }
  render() {
    console.log(this.state.items);

    let myContent;
    var renderedItems = this.state.items.map(function(item) {
      if (item.deleted == false) { return item; }
    });
    if (this.state.edit) {
      myContent = <TasksEdit
                  items={_.compact(renderedItems)}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  deleteTask={this.deleteTask.bind(this)}
                  total={this.state.total}
                  starsThisWeek={this.state.starsThisWeek}
                  date={this.state.date}
                  changeDate={this.changeDate.bind(this)}
                  />;
    } else {
      myContent = <TasksList
                  items={_.compact(renderedItems)}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  createTask={this.createTask.bind(this)}
                  changeItems={this.changeItems.bind(this)}
                  total={this.state.total}
                  payout={this.payout.bind(this)}
                  starsThisWeek={this.state.starsThisWeek}
                  date={this.state.date}
                  changeDate={this.changeDate.bind(this)}
                   />;
    }
    return (
      <View>{myContent}</View>
    )
  }
};

module.exports = Dashboard;
