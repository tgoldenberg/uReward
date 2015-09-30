var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksList = require('./TasksList');
var TasksEdit = require('./TasksEdit');
var seeds = require('./seeds');
var styles = require('./styles');

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

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      items: [],
      total: 0
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      let items = await AsyncStorage.getItem(ITEMS_KEY);
      let total = await AsyncStorage.getItem(TOTAL);
      if (items !== null && items != undefined){
        // console.log("FOUND ITEMS", items);
        this.setState({items: JSON.parse(items), total: parseInt(total)});
      } else {
        // console.log("NO ITEMS");
        AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(seeds));
        AsyncStorage.setItem(TOTAL, '0');
        this.setState({items: seeds, total: 0})
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

  createTask() {
    console.log("CREATE")
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
                  />;
    } else {
      myContent = <TasksList
                  rewards={this.state.items}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit.bind(this)}
                  createTask={this.createTask.bind(this)}
                  changeTotal={this.changeTotal.bind(this)}
                  total={this.state.total}
                   />;
    }
    return (
      <View>{myContent}</View>
    )
  }
};

module.exports = Dashboard;
