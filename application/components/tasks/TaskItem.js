const React           = require('react-native');
const Colors          = require('../colors');
let FAIcon = require('react-native-vector-icons/FontAwesome');
let MAIcon = require('react-native-vector-icons/MaterialIcons');
let styles            = require('../styles');
let {
  View,
  Text,
  Animated,
  Easing,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  AsyncStorage
} = React;

class TaskItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
    };
  }
  componentDidMount(){
    this.bounce();
  }
  componentDidUpdate(e){
  }
  bounce(){
    this.state.bounceValue.setValue(1.2);
    Animated.spring(
      this.state.bounceValue, {
        toValue: 1,
        friction: 1.5,
      }
    ).start();
  }
  smallBounce(){
    this.state.bounceValue.setValue(1.2);
    Animated.spring(
      this.state.bounceValue, {
        toValue: 1,
        friction: 2,
      }
    ).start();
  }
  render(){
    return (
      <View style={styles.rewardContainer}>
        <Animated.View style={{
          flex: .8,
          flexDirection: 'row',
          marginRight: 4,
          marginLeft: 8,
          transform: [
            {scale: this.state.bounceValue}
          ]
        }}>
          <FAIcon
            name='star'
            size={32}
            style={styles.starFull}
            color={this.props.starBackground}/>
          <Text style={styles.starText}>{this.props.todayStars}</Text>
        </Animated.View>
        <TouchableHighlight
          onPress={() => {
            this.props.decreaseStar();
            this.smallBounce();
          }}
          style={styles.rewardIconButton}
          underlayColor={Colors.lightBlue}>
            <FAIcon name='minus-square' size={25} style={styles.smallRewardIcons} color={Colors.blue} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.props.addStar();
            this.smallBounce();
          }}
          style={styles.rewardIconButton}
          underlayColor={Colors.lightBlue}>
            <FAIcon name='plus-square' size={25} style={styles.smallRewardIcons} color={Colors.blue} />
        </TouchableHighlight>
        <Text style={styles.reward}>{this.props.text}</Text>
        <Text style={styles.rewardStars}>({this.props.stars} stars)</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.addAllStars();
            this.smallBounce();
          }}
          style={styles.rewardIconButton}
          underlayColor={Colors.lightBlue}>
          <Animated.View>
            <FAIcon name='check-square-o' size={25} style={styles.smallRewardIcons} color={Colors.green}/>
          </Animated.View>
        </TouchableHighlight>
      </View>
    )
  }
}


module.exports = TaskItem;
