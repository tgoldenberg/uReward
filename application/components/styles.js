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
    backgroundColor: Colors.mediumBlue
  },
  mainTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 1
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
    marginRight: 15,
    marginLeft: 5,
    height: 40
  },
  payoutText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    marginLeft: 5,
    color: 'white',
    backgroundColor: 'transparent'
  },
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
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'white',
    backgroundColor: Colors.lightBlue
  },
  taskInput: {
    height: 50,
    padding: 4,
    flex: 3,
    marginRight: 4,
    fontSize: 23,
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
  buy: {
    fontSize: 18,
    color: 'black',
    flex: 1.2,
    marginTop: 8,
    fontWeight: 'bold'
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
    width: 70,
    height: 80,
    margin: 10,
    backgroundColor: Colors.regularBlue,
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
  starFull: {
    width: 40,
    height: 40,
    color: 'yellow'
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
    textAlign: 'center',
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
    padding: 20
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  pickerIOS: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10
  },
  pickerItem: {
    color: 'white'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    marginTop: 4,
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
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  editButtonsContainer: {
    marginTop: 5,
  },
  editButton: {
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = styles;
