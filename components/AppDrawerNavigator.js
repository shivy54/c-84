import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import Settings from '../screens/SettingScreen';
import MyDonation from '../screens/Mydonations';
import Notification from '../screens/NotificationScreen';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
  MyDonation : {
    screen : MyDonation
  },
  Notification : {
    screen : Notification
  },
    Settings: {
      screen : Settings
    },
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
