import React, { Component } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class Settings extends Components {
  constructor() {
    super();
    this.state = {
      EmailId: "",
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Address: "",
      DocId: "",
    };
  }
  getUserDetails() {
    var user = Firebase.auth().currentUser;
    // in the next line user is the var creaeed in line 17
    var email = user.email;

    db.collection("Users")
      .where("email_id", "==", email)
      .get()
      //snapshot is the data argument which contains all the data from .get
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            EmailId: data.email_id,
            FirstName: data.first_name,
            LastName: data.last_name,
            PhoneNumber: data.contact,
            Address: data.address,
            DocId: doc.id,
          });
        });
      });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  UpdateSettings = () => {
    db.collection("Users").doc(this.state.DocId).update({
      first_name: this.state.FirstName,
      last_name: this.state.LastName,
      contact: this.state.PhoneNumber,
      address: this.state.Address,
    });
    Alert.alert("Profile updated succesfully");
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Settngs" />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder="First Name"
            maxLength={13}
            onChangeText={(text) => {
              this.setState({
                FirstName: text,
              });
            }}
            value={this.state.FirstName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Last Name"
            maxLength={13}
            onChangeText={(text) => {
              this.setState({
                LastName: text,
              });
            }}
            value={this.state.LastName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Phone.no"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                PhoneNumber: text,
              });
            }}
            value={this.state.PhoneNumber}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Address"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                Address: text,
              });
            }}
            value={this.state.Address}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.UpdateSettings();
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  formContainer: { flex: 1, width: "100%", alignItems: "center" },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { fontSize: 25, fontWeight: "bold", color: "#fff" },
});
