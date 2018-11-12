import React from "react";
import { FlatList, View } from "react-native";
import { withNavigation } from "react-navigation";
import Item from "./Item";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

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
