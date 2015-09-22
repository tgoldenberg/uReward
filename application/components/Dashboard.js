var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
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
});

var Dashboard = React.createClass({
  render: function() {
    return (
    <View>

    <View style={{flexDirection: 'row', height: 100, marginTop: 60}}>
      <View style={{backgroundColor: 'aqua', flex: 0.5}} >
        <Text style={{fontSize: 20, marginLeft: 10, marginTop: 20}}>
          {this.props.username}
        </Text>
      </View>
      <View style={{backgroundColor: 'red', flex: 0.5}} >
        <Text style={{flex: 1, padding: 15, fontSize: 18 }}>
          Stars This Week: 10
        </Text>
        <Text style={{flex: 1, padding: 15, fontSize: 18 }}>
          Total Stars: 50
        </Text>
      </View>
    </View>
    <View style={{flexDirection: 'row', height: 70}}>
      <View style={{backgroundColor: 'grey', flex: 1}} >
        <Text style={{fontSize: 20, marginLeft: 10, marginTop: 20, textAlign: 'center'}}>
           Today, Saturday, October 11, 2015
        </Text>
      </View>

    </View>
    </View>
    )
  }
});

module.exports = Dashboard;
