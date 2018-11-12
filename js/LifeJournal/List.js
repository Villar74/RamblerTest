/**
 Copyright © 2018- by Maxim Dzhafarov. All rights reserved
 */
import React from "react";
import {
  FlatList,
  View,
  BackHandler,
  Alert,
  DeviceEventEmitter
} from "react-native";
import { withNavigation } from "react-navigation";
import Item from "./Item";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    DeviceEventEmitter.addListener("CLEAR", this.clearAll);
    AsyncStorage.getItem("DATA").then(data => {
      if (data !== null) {
        // We have data!!
        this.setState({
          data: JSON.parse(data)
        });
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    DeviceEventEmitter.removeAllListeners("CLEAR");
  }

  clearAll = () => {
    if (this.state.data.length !== 0) {
      Alert.alert(
        "Clear",
        "Delete all data?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => {
              this.setState({
                data: []
              });
            }
          }
        ],
        {
          cancelable: false
        }
      );
    }
  };

  handleBackButton = () => {
    // First, prepare a navigation prop for your child, or re-use one if already available.
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "Exit App",
        "Exiting the application?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Exit",
            onPress: () => this.saveData()
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      this.props.navigation.pop();
    }
    return true;
  };

  saveData = () => {
    AsyncStorage.setItem("DATA", JSON.stringify(this.state.data));
    BackHandler.exitApp();
  };

  createItem = (name, title, content, date, img) => {
    let data = this.state.data;
    data.push({ name, title, content, date, img, id: data.length });
    this.setState({
      data: data
    });
  };

  editItem = (name, title, content, date, img, id) => {
    let data = this.state.data;
    data[id].name = name;
    data[id].title = title;
    data[id].content = content;
    data[id].date = date;
    data[id].img = img;
    this.setState({
      data: data
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Item
                name={item.name}
                title={item.title}
                content={item.content}
                date={item.date}
                img={item.img}
                id={item.id}
                createItem={(name, title, content, date, img) =>
                  this.createItem(name, title, content, date, img)
                }
                editItem={(name, title, content, date, img, id) =>
                  this.editItem(name, title, content, date, img, id)
                }
              />
            );
          }}
        />

        <ActionButton
          buttonColor="#5d98f7"
          onPress={() =>
            this.props.navigation.navigate("NewItem", {
              createItem: (name, title, content, date, img) =>
                this.createItem(name, title, content, date, img)
            })
          }
          renderIcon={() => (
            <Icon name="create" type="materialicons" color={"white"} />
          )}
        />
      </View>
    );
  }
}

export default withNavigation(List);
