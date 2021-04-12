import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import BookDonateScreen from "../screens/BookDonateScreen";
import Reciever from "../screens/ReceiverDetails";

export const AppStackNavigator = createStackNavigator(
  {
    BookDonateList: {
      screen: BookDonateScreen,
      navigationOptions: { headerShown: false },
    },
    Recieverdetails: {
      screen: Reciever,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "BookDonateList",
  }
);
