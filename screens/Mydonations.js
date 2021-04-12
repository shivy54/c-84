import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader.js";
import firebase from "firebase";
import db from "../config.js";

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allDonations: [],
      donorName : "",
      bookName : "",
    };
    this.requestRef = null;
  }

  getAllDonations = () => {
    this.requestRef = db
      .collection("All_Donations")
      .where("Donor_Id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allDonations = snapshot.docs.map((document) => document.data());
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  sendNotifications = (bookDetails, requestStatus) => {
    var requestId = bookDetails.request_id;
    var donorId = bookDetails.donor_id;
    db.collection("All_Notification").where("Request_Id", "==", requestId).where("Donor_Id","==",donorId).get().then(snapshot =>{
      snapshot.forEach(doc => {
        var message = "";
        if (requestStatus === "Book Sent"){
          message = this.state.donorName + " has sent you the book - " + this.state.bookName;
        }else{
          message = this.state.donorName + " has shown interest in donating the book -" + this.state.bookName + "."
        }
        db.collection("All_Notification").doc(doc.id).update({
          "Message" : message,
          "Date" : firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })
  };

sendBook = (bookDetails) => {
if (bookDetails.requestStatus === "Book Sent"){
  var request_Status = "Donor Interested"
  db.collection("All_Donatons").doc(bookDetails.doc_id).update({
    "request_status" : "Donor Intersted"
  })
  this.sendNotifications(bookDetails, request_Status);
}else{
  var request_Status = "Book Sent";
  db.collection("All_Donations").doc(bookDetails.doc_id).update({
    "request_status" : "Book Sent"
})
this.sendNotifications(bookDetails, request_Status);
}
}

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.book_name}
      subtitle={
        "Requested By : " +
        item.requested_by +
        "\nStatus : " +
        item.request_status
      }
      leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity style={[styles.button,{backgroundColor : item.Request_Status === "Book Sent"?"green":"red"}]} onPress = {() => {
          this.sendBook(item)
        }}>
          <Text style={{ color: "#ffff" }}>
            {item.Request_Status === "Book Sent" ? "Book Sent" : "Send Book"}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Donations" />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
