'use strict';

var React = require('react-native');
var Dashboard = require('./Dashboard');

var {
  AsyncStorage,
  PickerIOS,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View
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

var STORAGE_KEY = '@AsyncStorageExample:key';

var BasicStorageExample = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({username: value, storedName: value});
        this.props.navigator.push({
          title: 'Dashboard',
          component: Dashboard,
          passProps: {username: value}
        });
      } else {
      }
    } catch (error) {
    }
  },

  getInitialState() {
    return {
      username: "",
      storedName: ""
    };
  },
  handleChange: function(e) {
    this.setState({username: e.nativeEvent.text});
  },

  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={"Your name"}
          value={this.state.username}
          ref="username"
          onChange={this.handleChange}
           />
         <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this._onValueChange}
          >
            <Text style={styles.buttonText}> SEARCH </Text>
          </TouchableHighlight>
        <Text>
          {'Username: '}
          <Text style={styles.buttonText}>
            {this.state.storedName}
          </Text>
        </Text>
      </View>
    );
  },

  async _onValueChange(selectedValue) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, this.state.username);
    } catch (error) {
    }
    this.setState({storedName: this.state.username});
    if (this.state.username != "") {
      this.props.navigator.push({
        title: 'Dashboard',
        component: Dashboard,
        passProps: {username: this.state.username}
      });
    }
  }
});


module.exports = BasicStorageExample;
