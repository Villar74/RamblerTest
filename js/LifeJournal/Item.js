/**
  Copyright © 2018- by Maxim Dzhafarov. All rights reserved
 */
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { Icon } from "react-native-elements";
import Markdown from "react-native-easy-markdown";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      content: "",
      date: "",
      img: ""
    };
  }

  editItem = (name, title, content, date, img) => {
    this.setState({
      name,
      title,
      content,
      date,
      img
    });
    this.props.editItem(name, title, content, date, img, this.props.id);
  };

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.header}>
          <Image
            source={require("../../img/userpic.png")}
            style={styles.userpic}
          />
          <View style={styles.info}>
            <View style={styles.user}>
              <Image
                source={require("../../img/userhead.png")}
                style={styles.userhead}
              />
              <Text style={styles.name}>
                {this.state.name ? this.state.name : this.props.name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>
                {this.state.date ? this.state.date : this.props.date}
              </Text>
            </View>
          </View>
          <View style={styles.editIcon}>
            <Icon
              name="dots-three-vertical"
              type="entypo"
              color={"#afafaf"}
              onPress={() =>
                this.props.navigation.navigate("NewItem", {
                  createItem: (name, title, content, date, img) =>
                    this.props.createItem(name, title, content, date, img),
                  editItem: (name, title, content, date, img) =>
                    this.editItem(name, title, content, date, img),
                  title: this.props.title,
                  content: this.props.content,
                  date: this.props.date,
                  img: this.props.img
                })
              }
            />
          </View>
        </View>
        <View style={styles.itemContent}>
          <Markdown style={styles.title}>
            {this.state.title ? this.state.title : this.props.title}
          </Markdown>
          <View style={styles.separator} />
          <Markdown style={styles.content}>
            {this.state.content ? this.state.content : this.props.content}
          </Markdown>
          <View style={styles.image}>
            <Image
              source={this.state.img ? this.state.img : this.props.img}
              style={styles.uploadedImg}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center"
  },
  itemContent: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 18
  },
  content: {
    fontSize: 18
  },
  image: {},
  uploadedImg: {
    height: 150,
    width: 150,
    resizeMode: "contain"
  },
  name: {
    paddingLeft: 10,
    fontSize: 18,
    color: "#5d98f7",
    alignSelf: "center"
  },
  date: {
    color: "#afafaf"
  },
  user: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  info: {
    flex: 5,
    paddingHorizontal: 10,
    alignContent: "center"
  },
  editIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: "#eaeaea"
  },
  userpic: {
    flex: 1,
    borderRadius: 25,
    height: 50,
    width: 50,
    resizeMode: "contain",
    justifyContent: "center"
  },
  userhead: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    alignSelf: "center"
  },
  separator: {
    height: 1,
    backgroundColor: "#eaeaea",
    marginHorizontal: 10
  }
});

export default withNavigation(Item);
