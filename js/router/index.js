import { createStackNavigator } from "react-navigation";
import HomeScreen from "../HomeScreen";
import Item from "../LifeJournal/Item";
import NewItem from "../LifeJournal/NewItem";
import List from "../LifeJournal/List";

export const RootStack = createStackNavigator(
  {
    List: {
      screen: List
    },
    Home: {
      screen: HomeScreen
    },
    Item: {
      screen: Item
    },
    NewItem: {
      screen: NewItem
    }
  },
  {
    initialRouteName: "Home"
  }
);
