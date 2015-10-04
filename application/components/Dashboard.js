var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksList = require('./TasksList');
var TasksEdit = require('./TasksEdit');
var seeds = require('./task_seeds');
var styles = require('./styles');
const starSeeds = require('./star_seeds');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Image
} = React;

const ITEMS_KEY = '@uReward:items';
const TOTAL = '@uReward:total';
const STARS_THIS_WEEK = '@uReward:starsThisWeek';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      items: [],
      total: 0,
      starsThisWeek: 0,
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      let items = await AsyncStorage.getItem(ITEMS_KEY);
      let total = await AsyncStorage.getItem(TOTAL);
      let starsThisWeek = await AsyncStorage.getItem(STARS_THIS_WEEK);
      if (items != null && items != undefined){
        console.log("FOUND ITEMS", items);
        var starList = JSON.parse(starsThisWeek);
        // debugger
        var numStars = 0;
        var now = new Date();
        var lastWeek = new Date(now - 7*24*60*60*1000);
        starList.forEach(function(item) {
          if (item.date >= lastWeek) {
            numStars += item.stars;
          }
        })
        this.setState({items: JSON.parse(items), total: parseInt(total), starsThisWeek: numStars});
      } else {
        console.log("NO ITEMS");
        AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(seeds));
        AsyncStorage.setItem(TOTAL, '0');
        AsyncStorage.setItem(STARS_THIS_WEEK, JSON.stringify(starSeeds));
        var numStars = 0;
        var now = new Date();
        var lastWeek = new Date(now - 7*24*60*60*1000);
        starSeeds.forEach(function(item) {
          if (item.date >= lastWeek) {
            numStars += item.stars;
          }
        })
        this.setState({items: seeds, total: 0, starsThisWeek: numStars })
      }
    } catch (error) {
    }
  }

  changeTotal(amount) {
    var {total} = this.state;
    total += amount;
    this.setState({total: total})
    AsyncStorage.setItem(TOTAL, total.toString());
  }

  createTask(items) {
    console.log("CREATE");
    var newItems = items.map(function(item) {
      return item.item;
    });
    this.setState({items: newItems});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(newItems));
  }

  toggleEdit() {
    var {edit} = this.state;
    this.setState({edit: !edit});
    console.log("TOGGLE EDIT MODE", this.state.edit);
  }

  deleteTask(id) {
    var {items} = this.state;
    delete items[id];
    this.setState({items: items})
  }

  render() {
    let myContent;
    if (this.state.edit) {
      myContent = <TasksEdit
                  rewards={this.state.items}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  deleteTask={this.deleteTask.bind(this)}
                  changeTotal={this.changeTotal.bind(this)}
                  total={this.state.total}
                  starsThisWeek={this.state.starsThisWeek}
                  />;
    } else {
      myContent = <TasksList
                  rewards={this.state.items}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  createTask={this.createTask.bind(this)}
                  changeTotal={this.changeTotal.bind(this)}
                  total={this.state.total}
                  starsThisWeek={this.state.starsThisWeek}
                   />;
    }
    return (
      <View>{myContent}</View>
    )
  }
};

module.exports = Dashboard;
