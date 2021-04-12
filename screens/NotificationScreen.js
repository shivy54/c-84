import firebase from "firebase";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      all_notifications: [],
    };
    this.notificationRef = null;
  }

  GetNotifications = () => {
    this.notificationRef = db
      .collection("All_Notification")
      .where("Notification_Status", "==", "Unread")
      .where("Targeted_User_Id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification["doc_Id"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          all_notifications: allNotifications,
        });
      });
  };

  componentDidMount() {
    this.GetNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
        title={item.book_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={item.message}
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader
            title={"Notifications"}
            navigation={this.props.navigation}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          {this.state.allNotifications.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              
              <Text style={{ fontSize: 25 }}>
                You have no notifications
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={this.renderItem}
            />
          )}{" "}
        </View>{" "}
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1 } });
