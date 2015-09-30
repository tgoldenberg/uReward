// "use strict";
var _ = require('underscore');
var React = require('react-native');
var { Icon, } = require('react-native-icons');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  AsyncStorage
} = React;

const ITEMS_KEY = '@AsyncStorageExample:items';
const TOTAL = '@AsyncStorageExample:total';
const ITEMS_KEY_TODAY = `@AsyncStorageExample:itemsToday`;

var TasksEdit = React.createClass({
  getInitialState: function() {
    return {items: []};
  },
  deleteTask: function(id) {
    var {items} = this.state;
    delete items[id];

    this.setState({items: _.compact(items)});
    AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(_.compact(items)));
    this.props.deleteTask(id);
  },
  componentDidMount: function() {
    this._loadInitialState().done();
  },
  async _loadInitialState() {
    try {
      var items = await AsyncStorage.getItem(ITEMS_KEY_TODAY);
      if (items !== null) {
        this.setState({items: JSON.parse(items)})
      } else {
        var items = this.props.rewards.map(function(item) {
          return {item: item, stars: 0};
        })
        AsyncStorage.setItem(ITEMS_KEY_TODAY, JSON.stringify(items));
        this.setState({items: items});
      }
    } catch (error) {
    }
  },
  render: function() {
    var self = this;
    var rewards = this.state.items.map(function(reward, idx){
      var text = reward.item.name.substring(0,23);
      if (text.length == 23) {
        text += "...";
      }
      var boundDelete = self.deleteTask.bind(null, idx);
      console.log("PROPS", self.props);
      return  <View style={styles.rewardContainer} key={idx} ref={`item${idx}`}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={boundDelete}
                  ref={`reward${idx}`}
                  >
                  <Icon
                    name='fontawesome|times'
                    size={30}
                    style={styles.times}
                    color='#777'
                    />
                </TouchableHighlight>
                <View style={styles.starContainer}>
                  <Text style={styles.starText}>{reward.stars}</Text>
                  <Icon
                    name='fontawesome|star-o'
                    size={40}
                    style={styles.star}
                    color='#6A85B1'
                    ></Icon>
                </View>


                <Text style={styles.reward}>{text}</Text>
                <Text style={styles.rewardStars}>({reward.item.stars} stars)</Text>
                <Icon
                  name='fontawesome|bars'
                  size={30}
                  style={styles.rewardIcons}
                  color='#6A85B1'
                  />
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
              Hello World!
            </Text>
          </View>
          <View style={{backgroundColor: '#b4b4b4', flex: 0.5}} >
            <Text style={{flex: 2, padding: 15, fontSize: 18, backgroundColor: '#a7a7a7' }}>
              Stars This Week: 10
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
               Today, Saturday, October 11, 2015
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
          <View style={styles.editTaskContainer}>
            <TouchableHighlight
              style={styles.editButton}
              underlayColor="white"
              onPress={this.props.toggleEdit}
              >
              <Text style={styles.editTaskText}>
                Done
              </Text>
            </TouchableHighlight>
          </View>
          {rewards}

        </ScrollView>
      </View>
    )
  }
});

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
  times: {
    flex: .7,
    width: 30,
    height: 30,
    fontSize: 15,
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

module.exports = TasksEdit;
