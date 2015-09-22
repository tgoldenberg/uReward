var React = require('react-native');
var Dashboard = require('./Dashboard');
var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
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

var Main = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      isLoading: false,
      error: false
    }
  },
  handleChange: function(e) {
    this.setState({username: e.nativeEvent.text})
  },
  handleSubmit: function(e) {
    this.setState({
      isLoading: true
    });
    console.log('SUBMIT', this.state.username);
    this.props.navigator.push({
      title: 'dashboard',
      component: Dashboard,
      passProps: {username: this.state.username}
    });
  },
  render: function() {
    return(
      <View style={styles.mainContainer}>
      <Text style={styles.title}> uReward </Text>
      <TextInput
        style={styles.searchInput}
        placeholder={"Your name"}
        value={this.state.username}
        onChange={this.handleChange.bind(this)}
        ref="username"
         />
       <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit.bind(this)}
        >
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
      </View>
      )
  }
});

module.exports = Main;
