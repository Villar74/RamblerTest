import React from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import moment from "moment";
import { withNavigation } from "react-navigation";
import ImagePicker from "react-native-image-picker";

const example =
  "# Why is markdown cool?\n\n" +
  "* because it lets us do simple formatting **easily** \n" +
  "* _without_ the need for complex CMS data structures \n" +
  "* and you can outsource ~~your~~ work to the content creators! \n\n";
const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "USERNAME",
      title: this.props.navigation.state.params.title
        ? this.props.navigation.state.params.title
        : "",
      content: this.props.navigation.state.params.content
        ? this.props.navigation.state.params.content
        : "",
      avatarSource: this.props.navigation.state.params.img
        ? this.props.navigation.state.params.img
        : "",
      selected: {
        start: 0,
        end: 0
      },
      backContent: this.props.navigation.state.params.content
        ? this.props.navigation.state.params.content
        : "",
      forwardContent: this.props.navigation.state.params.content
        ? this.props.navigation.state.params.content
        : ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "New Post",
      headerRight: (
        <Icon
          onPress={() => {
            params.handleThis();
          }}
          name="send"
          type="materialicons"
          containerStyle={{ paddingRight: 15 }}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleThis: this.props.navigation.state.params.date
        ? this.editItem
        : this.createNew
    });
  }

  createNew = () => {
    this.props.navigation.state.params.createItem(
      this.state.name,
      this.state.title,
      this.state.content,
      moment().format("MMM DD YYYY, mm:ss"),
      this.state.avatarSource
    );
    this.props.navigation.goBack();
  };

  editItem = () => {
    this.props.navigation.state.params.editItem(
      this.state.name,
      this.state.title,
      this.state.content,
      this.props.navigation.state.params.date,
      this.state.avatarSource
    );
    this.props.navigation.goBack();
  };

  makeBold = () => {
    this.addStyle("**");
  };

  makeItalic = () => {
    this.addStyle("_");
  };

  makeStrike = () => {
    this.addStyle("~~");
  };

  getImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  addStyle(symbols) {
    let a = this.state.content;
    let b = symbols;

    const selectionBeforeChange = {
      start: this.state.selected.start + b.length,
      end: this.state.selected.end + b.length
    };
    let start = this.state.selected.start;
    let end = this.state.selected.end + b.length;
    let output = [a.slice(0, start), b, a.slice(start)].join("");
    output = [output.slice(0, end), b, output.slice(end)].join("");
    this.setState(
      {
        forwardContent: output,
        backContent: this.state.content,
        content: output
      },
      () => {
        setTimeout(() => {
          this.setState({ selected: selectionBeforeChange });
        }, 350);
      }
    );
  }

  back = () => {
    console.log("works");
    if (this.state.content !== this.state.backContent)
      this.setState({
        newContent: this.state.content,
        content: this.state.backContent
      });
  };

  forward = () => {
    this.setState({
      backContent: this.state.content,
      content: this.state.newContent
    });
  };

  _handleSelectionChange = event => {
    this.setState({ selected: event.nativeEvent.selection });
  };

  render() {
    //todo fix selection
    /*        let delimiter = /\s+/;

        //split string
        let _text = this.state.content;
        let token, index, parts = [];
        while (_text) {
            delimiter.lastIndex = 0;
            token = delimiter.exec(_text);
            if (token === null) {
                break;
            }
            index = token.index;
            if (token[0].length === 0) {
                index = 1;
            }
            parts.push(_text.substr(0, index));
            parts.push(token[0]);
            index = index + token[0].length;
            _text = _text.slice(index);
        }
        parts.push(_text);

        //highlight
        parts = parts.map((text) => {
            let output = text;
            let style = [];
            if (/^#/.test(text)) {
                style.push(styles.hashtag);
            } if (/\*\*.*\*\*!/.test(text)) {
                style.push(styles.bold);
            }  if (/^_.*_/.test(text)) {
                style.push(styles.italic);
            }  if (/^~~.*~~/.test(text)) {
                style.push(styles.strike);
            }
            output = <Text key={text} style={style}>{text}</Text>;
            return output;

        });*/
    return (
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={{ justifyContent: "center" }}>
            <Image
              source={require("../../img/userpic.png")}
              style={styles.userpic}
            />
          </View>
          <View style={styles.user}>
            <Image
              source={require("../../img/userhead.png")}
              style={styles.userhead}
            />
            <Text style={styles.name}>{this.state.name}</Text>
          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={title => this.setState({ title })}
            placeholder={"Title"}
            value={this.state.title}
          />
          <View style={styles.separator} />
          <TextInput
            multiline
            //value={this.state.content}
            onChangeText={content => {
              this.setState({
                backContent: this.state.content,
                forwardContent: content,
                content
              });
            }}
            placeholder={"Content"}
            onSelectionChange={(event: Event) => {
              let selection = event.nativeEvent.selection;
              this.setState({
                selected: {
                  start: selection.start,
                  end: selection.end
                }
              });
              this._handleSelectionChange.bind(this);
              console.log(selection.start, selection.end);
            }}
            selection={this.state.selected}
          >
            <Text>{this.state.content}</Text>
          </TextInput>
          <Image source={this.state.avatarSource} style={styles.uploadImg} />
        </View>
        <View style={styles.buttons}>
          <Icon
            containerStyle={styles.boldBtn}
            name={"bold"}
            type={"font-awesome"}
            onPress={() => this.makeBold()}
          />
          <Icon
            containerStyle={styles.boldBtn}
            name={"italic"}
            type={"font-awesome"}
            onPress={() => this.makeItalic()}
          />
          <Icon
            containerStyle={styles.boldBtn}
            name={"strikethrough"}
            type={"font-awesome"}
            onPress={() => this.makeStrike()}
          />
          <Icon
            containerStyle={styles.boldBtn}
            name={"image"}
            type={"font-awesome"}
            onPress={() => this.getImage()}
          />
          <Icon
            containerStyle={styles.boldBtn}
            name={"back"}
            type={"entypo"}
            onPress={() => this.back()}
          />
          <Icon
            containerStyle={styles.boldBtn}
            name={"forward"}
            type={"entypo"}
            onPress={() => this.forward()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "white"
  },
  buttons: {
    paddingLeft: 20,
    flexDirection: "row"
  },
  hashtag: {
    color: "#474778"
  },
  uploadImg: {
    height: 150,
    width: 150,
    resizeMode: "contain"
  },
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  strike: {
    textDecorationLine: "line-through"
  },
  boldBtn: {
    padding: 15
  },
  input: {
    flex: 5,
    paddingHorizontal: 20,
    justifyContent: "flex-start"
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row"
  },
  user: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#eaeaea",
    marginVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  userpic: {
    borderRadius: 25,
    height: 50,
    width: 50,
    marginRight: 20,
    resizeMode: "contain",
    justifyContent: "center"
  },
  userhead: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    alignSelf: "center"
  },
  name: {
    paddingLeft: 10,
    fontSize: 18,
    color: "#5d98f7",
    alignSelf: "center"
  },
  separator: {
    height: 1,
    backgroundColor: "#eaeaea"
  }
});
export default withNavigation(NewItem);
