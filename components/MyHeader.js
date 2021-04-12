import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert } from "react-native";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  getNumberOfNotifications = () => {
    db.colection("All_Notifications")
      .where("notification_Status", "==", "Unread")
      .onSnapshot((snapshot) => {
        var unreadNotification = snapshot.docs.map((doc) => {
          doc.data();
        });
        this.setState = {
          value: unreadNotification.length,
        };
      });
  };
  componentDidMount = () => {
    this.getNumberOfNotifications();
  };

  BellIconWithBadge = (props) => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#696969"
          size={25}
          onPress={() => props.navigation.navigate("Notification")}
        />
        <Badge
          value= {this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      </View>
    );
  };
  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#696969"
            onPress={() => props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: props.title,
          style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
        }}
        backgroundColor="#eaf8fe"
        rightComponent={<BellIconWithBadge {...props} />}
      />
    );
  }
}
