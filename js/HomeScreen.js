/**
 Copyright © 2018- by Maxim Dzhafarov. All rights reserved
 */
import React from "react";
import { View, StyleSheet, DeviceEventEmitter } from "react-native";
import List from "./LifeJournal/List";
import { Icon } from "react-native-elements";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Home",
      headerRight: (
        <Icon
          onPress={() => {
            params.handleThis();
          }}
          name="delete"
          type="materialicons"
          containerStyle={{ paddingRight: 15 }}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.navigation.setParams({
      handleThis: () => DeviceEventEmitter.emit("CLEAR")
    });
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
