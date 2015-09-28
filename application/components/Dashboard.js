var React = require('react-native');
var { Icon, } = require('react-native-icons');
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
    borderRadius: 3
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
  }
});

var Dashboard = React.createClass({
  render: function() {
    var rewards = MY_REWARDS.map(function(reward, idx){

      var text = reward.name.substring(0,23);
      if (text.length == 23) {
        text += "...";
      }
      return  <View style={styles.rewardContainer} key={idx}>
                <Icon
                  name='fontawesome|star-o'
                  size={30}
                  style={styles.smallRewardIcons}
                  color='#6A85B1'
                  ></Icon>
                <Icon
                  name='fontawesome|minus-square'
                  size={30}
                  style={styles.smallRewardIcons}
                  color='#6A85B1'
                  />
                <Icon
                  name='fontawesome|plus-square'
                  size={30}
                  style={styles.smallRewardIcons}
                  color='#6A85B1'
                  />
                <Text style={styles.reward}>{text}</Text>
                <Text style={styles.rewardStars}>({reward.stars} stars)</Text>
                <Icon
                  name='fontawesome|check-square-o'
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
            />
        <Text style={{fontSize: 20, marginLeft: 10, marginTop: 20, flex: 2}}>
            {this.props.username}
          </Text>
        </View>
        <View style={{backgroundColor: '#b4b4b4', flex: 0.5}} >
          <Text style={{flex: 2, padding: 15, fontSize: 18, backgroundColor: '#a7a7a7' }}>
            Stars This Week: 10
          </Text>
          <Text style={{flex: 1, padding: 15, fontSize: 18 }}>
            Total Stars: 50
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
        {rewards}
      </ScrollView>
    </View>
    )
  }
});

module.exports = Dashboard;
