/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './components/Header';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Registrations from './pages/Registrations';
import NewMeet from './pages/NewMeet';
import SearchMeets from './pages/Meetups/SearchMeets';
import MyMeets from './pages/Meetups/MyMeets';
import Profile from './pages/Profile';

const Meet = createStackNavigator(
  {
    Meets: {
      screen: createMaterialTopTabNavigator(
        {
          SearchMeets,
          MyMeets,
        },
        {
          animationEnabled: false,
          lazy: true,
          tabBarOptions: {
            style: {
              backgroundColor: '#22202c',
            },
            indicatorStyle: {
              backgroundColor: '#FFF',
            },
            upperCaseLabel: false,
          },
        }
      ),
      navigationOptions: {
        headerTitle: <Header />,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#22202c',
      },
    },
  }
);

Meet.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="menu" size={20} color={tintColor} />
  ),
};

const Reg = createStackNavigator(
  {
    RegHome: Registrations,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#22202c',
      },
    },
  }
);

Reg.navigationOptions = {
  tabBarLabel: 'Registrations',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};

const New = createStackNavigator(
  {
    NewHome: NewMeet,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#22202c',
      },
    },
  }
);

New.navigationOptions = {
  tabBarLabel: 'New Meetup',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="add-circle-outline" size={20} color={tintColor} />
  ),
};

const Prof = createStackNavigator(
  {
    ProfHome: Profile,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#22202c',
      },
    },
  }
);

Prof.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Meet,
            Reg,
            New,
            Prof,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#3A1C41',
              },
            },
            navigationOptions: {
              headerShow: false,
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
