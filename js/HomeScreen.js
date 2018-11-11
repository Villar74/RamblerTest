import React from "react";
import { View, StyleSheet } from "react-native";
import List from "./LifeJournal/List";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.home}>
        <List />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "white"
  }
});
