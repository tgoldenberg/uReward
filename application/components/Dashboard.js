const ITEMS_KEY   = '@uReward:items';
const TOTAL       = '@uReward:total';
const React       = require('react-native');
let { Icon, }     = require('react-native-icons');
let TasksList     = require('./tasks/TasksList');
let TasksEdit     = require('./tasks/TasksEdit');
let Payout        = require('./rewards/Payout');
let _             = require('underscore');
let styles        = require('./styles');
let { View, Text, TextInput, TouchableHighlight, ScrollView, AsyncStorage, Image, } = React;

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
     }
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    let items = await AsyncStorage.getItem(ITEMS_KEY);
    if (items != null) {
      // console.log("FOUND ITEMS", items);
      this.setState({items: JSON.parse(items) });
      this.setStarsThisWeek();
      this.setTotal();
    }
  }
  setTotal() {
    let totalStars = 0;
    this.state.items.forEach((item) => {
      var keys = _.keys(item.datesStarred);
      keys.forEach((key) => { totalStars += item.datesStarred[key]; });
    });
    this.setState({total: totalStars});
    return totalStars;
  }
  setStarsThisWeek() {
    let starsThisWeek = 0, sunday;
    let today = new Date();
    let day = today.getDay();
    if (day == 0)
      sunday = today;
    else
      sunday = new Date(today - 24*60*60*1000*day);
    let week = [
      sunday.toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*1).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*2).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*3).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*4).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*5).toLocaleDateString(),
      new Date(new Date(sunday).valueOf() + 24*60*60*1000*6).toLocaleDateString(),
    ]
    // console.log("WEEK", week);
    this.state.items.forEach((item) => {
      week.forEach((day) => {
        if (item.datesStarred[day] != null)
          starsThisWeek += item.datesStarred[day];
      });
    });
    this.setState({starsThisWeek: starsThisWeek });
    return starsThisWeek;
  }

  changeItems(items) {
    // console.log(items[0].datesStarred)
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    this.setState({items: items});
    this.setStarsThisWeek();
    this.setTotal();
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
    this.setState({edit: !this.state.edit});
  }

  deleteTask(id) {
    console.log("DELETE", id);
    var items = _.compact(this.state.items.map((item) => {
      if (! item.deleted) {return item; }
    }));
    items[id].deleted = true;

    this.setState({items: items});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }

  changeDate(date) {
    this.setState({date: date.toLocaleDateString()});
  }

  reduceStars(stars) {
    var items = _.compact(this.state.items);
    var count = stars;
    items.forEach((item, index) => {
      var keys = _.keys(item.datesStarred);
      keys.forEach((key) => {
        while (item.datesStarred[key] > 0 && count > 0 ) {
          item.datesStarred[key] -= 1;
          count -= 1;
        }
      });
    });
    this.setState({items: items});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    let starsThisWeek = this.setStarsThisWeek();
    let total = this.setTotal();
    this.props.navigator.replace({
      title: 'Payout',
      component: Payout,
      passProps: {
        total: total,
        starsThisWeek: starsThisWeek,
        username: this.props.username,
        reduceStars: this.reduceStars.bind(this)
      }
    });
  }

  payout() {
    let starsThisWeek = this.state.starsThisWeek;
    let total = this.state.total;

    this.props.navigator.push({
      title: 'Payout',
      component: Payout,
      passProps: {
        total: total,
        starsThisWeek: starsThisWeek,
        username: this.props.username,
        reduceStars: this.reduceStars.bind(this)
      }
    });
  }

  render() {
    let myContent;
    let renderedItems = this.state.items.map((item) => {
      if (item.deleted == false)
        return item;
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
