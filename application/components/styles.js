var React = require('react-native');
var Colors = require('./colors');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: Colors.mediumBlue,
    paddingLeft: 5,
    paddingRight: 5,
  },
  mainTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 30,
  },
  searchButtonText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  payoutContainer: {
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  payoutButton: {
    backgroundColor: Colors.blue,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
    height: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  payoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginLeft: 10,
    marginTop: 6,
    backgroundColor: 'transparent'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: 10
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
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'white',
    backgroundColor: Colors.lightBlue
  },
  taskInput: {
    height: 40,
    padding: 4,
    flex: 3,
    marginRight: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 23,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  reward: {
    fontSize: 15,
    textAlign: 'left',
    color: '#222',
    flex: 3,
    paddingLeft: 7,
  },
  rewardStars: {
    fontSize: 12,
    color: '#333',
    flex: 1.5
  },
  buy: {
    fontSize: 18,
    color: 'black',
    flex: 1.2,
    fontWeight: 'bold'
  },
  rewardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 55,
    paddingRight: 8,
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    marginTop: 4,
    borderRadius: 3,
    backgroundColor: "#e6e6e6"

  },
  scrollView: {
    backgroundColor: Colors.mediumBlue,
    height: 600,
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
    width: 55,
    height: 60,
    margin: 5,
    marginTop: 12,
    marginLeft: 5,
    backgroundColor: Colors.regularBlue,
    borderRadius: 2
  },
  calendarSigns: {
    width: 50,
    height: 50,
    flex: 1,
  },
  rewardIcons: {
    width: 25,
    height: 25,
    flex: .7,
    fontSize: 10,
    marginTop: 3,
  },
  smallRewardIcons: {
    flex: .7,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rewardIconButton: {
    backgroundColor: 'transparent',
    marginTop: 4,
    height: 25,
    width: 25,
  },
  times: {
    flex: .7,
    width: 30,
    height: 30,
    fontSize: 15,
  },
  starFull: {
    width: 30,
    height: 30,
    color: 'yellow'
  },
  star: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent'
  },
  starContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  editStarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  starText: {
    position: 'absolute',
    left: -0.5,
    top: 7,
    width: 30,
    textAlign: 'center',
    fontSize: 12,
    color: "#333",
    backgroundColor: 'transparent'
  },
  createTaskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.mediumBlue,
    padding: 10,
    marginTop: 4,
    borderRadius: 3
  },
  pickerMainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  pickerIOS: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  rewardsPickerIOS: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'stretch',
  },
  pickerItem: {

  },
  addStars: {
    flex: 1
  },
  starsSelectContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    marginTop: 4,
    borderRadius: 3,
    backgroundColor: Colors.mediumBlue
  },
  editTaskContainer: {
    flex: 1,
    height: 50,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: 8,
    backgroundColor: Colors.blue
  },
  selectStarText: {
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  editTaskText: {
    fontSize: 18,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  editButtonsContainer: {
    marginTop: 3,
  },
  editButton: {
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = styles;
