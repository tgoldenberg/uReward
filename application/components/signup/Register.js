const USERNAME_KEY  = '@uReward:username';
const React         = require('react-native');
let Colors          = require('../colors');
let Dashboard       = require('../Dashboard');
let styles          = require('../styles');
let { AsyncStorage, Text, TextInput, TouchableHighlight, View } = React;

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = { username: "", storedName: "" }
  }
  componentDidMount() {
    this._loadInitialState();
  }
  async _loadInitialState() {
    let username = await AsyncStorage.getItem(USERNAME_KEY);
    if (username != null ) {
      this.setState({username: username, storedName: username});
      this.props.navigator.push({
        title: 'Dashboard',
        component: Dashboard,
        passProps: {username: username}
      });
    }
  }
  handleChange(e) {
    this.setState({username: e.nativeEvent.text});
  }
  handlePress() {
    AsyncStorage.setItem(USERNAME_KEY, this.state.username);
    this.setState({storedName: this.state.username});
    if (this.state.username != "") {
      this.props.navigator.push({
        title: 'Dashboard',
        component: Dashboard,
        passProps: {username: this.state.username}
      });
    }
  }
  render() {
    return (
      <View style={styles.registerContainer}>
        <Text style={styles.mainTitle}>rewardU</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={"Your name"}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
         />
        <TouchableHighlight
          style={styles.button}
          underlayColor={Colors.lightBlue}
          onPress={this.handlePress.bind(this)}>
          <Text style={styles.searchButtonText}> SIGNUP </Text>
        </TouchableHighlight>
        <Text style={styles.buttonText}>Username: {this.state.storedName}</Text>
      </View>
    );
  }
};

module.exports = Register;
