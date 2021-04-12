import firebase from "firebase";
import React, { Component } from "react";
import { Alert } from "react-native";
import { TouchableOpacity, View, Text} from "react-native";
import Card from 'react-native-elements';
import MyHeader from "../components/MyHeader.js";
import db from "../config.js";

export default class Reciever extends Component {
  construstor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.propsNavigation.getParam("details")["user_id"],
      requestId: this.propsNavigation.getParam("details")["request_id"],
      bookName: this.propsNavigation.getParam("details")["book_name"],
      reasonToRequest: this.propsNavigation.getParam("details")[
        "reason_to_request"
      ],
      receiverName:"",
      reciverContact:"",
      reciverAddress:"",
      recevierRequestDocId:"",
donorName: "",
    };
  }
getReciverDetails = () => {
  db.collection("users").where('email_id','==',this.state.receiverId).get()
  .then(snapshot =>{
    snapshot.forEach(doc => {
      this.setState({
        receiverName : doc.data().first_name,
        receiverContact : doc.data().contact,
        receiverAddress : doc.data().address,
      })
    })
  })
}
statusUpdate =  () => {
  db.collection("All_Donations").add({
    Book_Name : this.state.bookName,
    Request_Id : this.state.requestId,
    Requsted_by : this.state.receiverName,
    Donor_Id : this.state.userId,
    Request_Status : "Donor Intrested"
  })
}

AddNotifications = () => {
  var message = this.state.donorName + " has shown interest in donating the book" + this.state.bookName + "."
  db.collection("All_Notifications").add({
    "Targeted_User_Id" : this.state.receiverId,
    "Donor_Id" : this.state.userId,
    "Request_Id" : this.state.receiverId,
    "Book_Name" : this.state.bookName,
    "Date" : firebase.firestore.FieldValue.serverTimestamp(),
    "Notification_Status" : "Unread",
    "Message" : message
  })
}

GetUserDetails = (userId) => {
db.collection("users").where("email_id" ,"==" , userId ).get()
.then(snapshot => {
  snapshot.forEach(doc  => {
    this.setState({
      donorName:doc.data().first_name + " " + doc.date().first_name
    })
  })
})
}

  render() {
    return (
    <View style={styles.container}>
<View style={{flex:0.1}}>
<MyHeader title="Information"/>
</View>
<View style={{flex:0.3}}>
  <Card title={"Book Info"} titleStyle={{fontSize=20}}>
    <Card>
      <Text style={{fontWeight:"bold"}}>
        Name : {this.state.bookName}
      </Text>
    </Card>
    <Card>
      <Text style={{fontWeight:"bold"}}>
        Reason : {this.state.reasonToRequest}
      </Text>
    </Card>
  </Card>
</View>
<View style={{flex:0.3}}>
<Card title={"Reciver Info"} titleStyle={{fontSize=20}}>     
    <Card>
      <Text style={{fontWeight:"bold"}}>
        Name : {this.state.reciverName}
      </Text>
    </Card>
    <Card>
      <Text style={{fontWeight:"bold"}}>
        Contact : {this.state.receiverContact}
      </Text>
    </Card>
    <Card>
      <Text style={{fontWeight:"bold"}}>
        Address : {this.state.receiverAddress}
      </Text>
    </Card>
  </Card>
</View>
<View style={styles.buttonContainer}>
{
  this.state.receiverId !== this.state.userId ?(
    <TouchableOpacity style={styles.button} onPress = {() => {
      this.statusUpdate()
      this.AddNotifications()
      this.props.navigation.navigate("Mydonations")
    }}>
      <Text>I am Intrested</Text>
    </TouchableOpacity>
  ):
  Alert.alert('You are not allowed to donate books to yourself')
}
</View>
    </View>
    )
  }
}

const styles = StyleSheet.create({ container: { flex:1, }, buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })