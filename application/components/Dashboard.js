var React = require('react-native');
var { Icon, } = require('react-native-icons');
var TasksList = require('./TasksList');
var TasksEdit = require('./TasksEdit');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image
} = React;

MY_REWARDS = [
  {
    name: "Eat protein with breakfast",
    stars: 2
  },
  {
    name: "Run 2-3 miles",
    stars: 1
  },
  {
    name: "Spend 1 hour daily on research",
    stars: 3
  },
  {
    name: "Lose 10 lbs",
    stars: 10
  },
  {
    name: "Write all thank you notes for wedding",
    stars: 5
  },
  {
    name: "Call mom & dad 1x a month",
    stars: 2
  },
  {
    name: "Go see Knicks game",
    stars: 5
  },
  {
    name: "Call my brother",
    stars: 2
  },
  {
    name: "Get a job at Brainscape",
    stars: 10
  },
  {
    name: "Get into an Ivy League executive MBA program",
    stars: 50
  },
  {
    name: "Get great recommendations from direct supervisors",
    stars: 20
  }
]

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20
  },
  row: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  topRow: {
    padding: 10,
    backgroundColor: 'white',
    height: 40
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },

  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  reward: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    flex: 3,
    padding: 5
  },
  rewardStars: {
    fontSize: 12,
    marginTop: 10,
    color: 'black',
    flex: 1.2
  },
  rewardContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderColor: 'black',
    marginTop: 4,
    borderRadius: 3,
    backgroundColor: "#e6e6e6"

  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 500,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 0
  },
  logo: {
    width: 200,
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5
  },
  facebook: {
    width: 70,
    height: 80,
    margin: 10,
    backgroundColor: '#6A85B1',
    borderRadius: 2
  },
  calendarSigns: {
    width: 50,
    height: 50,
    flex: 1,
    marginTop: 7
  },
  rewardIcons: {
    width: 40,
    height: 40,
    flex: 1,
    fontSize: 10
  },
  smallRewardIcons: {
    flex: .7,
    width: 30,
    height: 30,
    marginTop: 6
  },
  star: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent'
  },
  starContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  starText: {
    position: 'absolute',
    left: 10,
    top: 12,
    width: 20,
    textAlign: 'center'
  },
  editTaskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    marginTop: 4,
    borderRadius: 3,
    backgroundColor: "white"
  },
  editTaskText: {
    fontSize: 20,
    color: 'black',
    padding: 10
  },
  editButton: {
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return {edit: false};
  },
  toggleEdit: function() {
    this.setState({edit: !this.state.edit});
    console.log("EDIT", this.state.edit);
  },
  render: function() {
    var content;
    if (this.state.edit) {
      content = <TasksEdit
                  rewards={MY_REWARDS}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit}
                  />;
    } else {
      content = <TasksList
                  rewards={MY_REWARDS}
                  username={this.props.username}
                  toggleEdit={this.toggleEdit}
                   />;
    }
    return (
      <View>
        {content}
      </View>
    )
  }
});

module.exports = Dashboard;
