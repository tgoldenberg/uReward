var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksList = require('./TasksList');
var TasksEdit = require('./TasksEdit');
var _ = require('underscore');
var styles = require('./styles');
var { View, Text, TextInput, TouchableHighlight, ScrollView, AsyncStorage, Image } = React;
const ITEMS_KEY = '@uReward:items';
const TOTAL = '@uReward:total';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      items: [],
      date: new Date().toLocaleDateString(),
      today: new Date().toLocaleDateString()
     }
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    let items = await AsyncStorage.getItem(ITEMS_KEY);
    if (items != null) {
      console.log("FOUND ITEMS", items);
      this.setState({items: JSON.parse(items) })
    }
  }

  changeItems(items) {
    console.log(items[0].datesStarred)
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    this.setState({items: items});
  }

  changeTotal(amount) {
    var {total} = this.state;
    total += amount;
    this.setState({total: total})
    AsyncStorage.setItem(TOTAL, total.toString());
  }

  createTask(item) {
    var {items} = this.state;
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
    delete items[id];
    var newItems = _.compact(items);
    console.log("NEW ITEMS", newItems);
    this.setState({items: newItems});
    AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(newItems));
  }

  changeDate(date) {
    this.setState({date: date.toLocaleDateString()});
  }

  render() {
    let myContent;
    if (this.state.edit) {
      myContent = <TasksEdit
                  items={this.state.items}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  deleteTask={this.deleteTask.bind(this)}
                  changeTotal={this.changeTotal.bind(this)}
                  total={this.state.total}
                  starsThisWeek={this.state.starsThisWeek}
                  date={this.state.date}
                  changeDate={this.changeDate.bind(this)}
                  />;
    } else {
      myContent = <TasksList
                  items={this.state.items}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  createTask={this.createTask.bind(this)}
                  changeItems={this.changeItems.bind(this)}
                  total={this.state.total}
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
