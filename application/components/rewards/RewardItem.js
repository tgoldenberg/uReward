const React           = require('react-native');
const Colors          = require('../colors');
let { Icon, }         = require('react-native-icons');
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

class RewardItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
    };
  }
  componentDidMount(){
    this.bounce();
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
        <Animated.View
          style={{
            flex: 0.8,
            flexDirection: 'row',
            transform: [
              {scale: this.state.bounceValue}
            ]
          }}
          >
          <Icon name='fontawesome|star' size={40} style={styles.star} color={Colors.yellow}/>
          <Text style={styles.starText}>{this.props.stars}</Text>
        </Animated.View>

        <Text style={styles.reward}>{this.props.name}</Text>
        <Text style={styles.buy}>BUY</Text>
        <TouchableHighlight
          onPress={()=> {
            this.props.buyReward();
            if (this.props.total > this.props.stars) {
              this.bounce();
            }
          }}
          underlayColor={Colors.lightBlue}>
          <Icon name='fontawesome|check-square-o' size={30} style={styles.rewardIcons} color={Colors.green}/>
        </TouchableHighlight>
      </View>
    )
  }
}


module.exports = RewardItem;
