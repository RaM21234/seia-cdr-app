// src/MyTabs.tsx
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import NumSearch from '../screen/NumSearch';
import VehicleSearch from '../screen/VehicleSearch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../screen/Profile';
import Dashboard from '../screen/Dashboard';
import FeatureList from './FeatureList';
import {ImageBackground, View} from 'react-native';

type RootTabParamList = {
  FeatureList: undefined;

  Profile: undefined;
  Dashboard: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const CustomTabBar = props => {
  return (
    <View
      className="border-0"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180, // Set the height for your tab bar
      }}>
      <ImageBackground
        source={require('../assets/Subtract.png')} // Ensure the path is correct
        style={{
          width: '130%', // Increase width to achieve zoom effect
          position: 'absolute',
          left: -120, // Adjust left to center the zoom
          top: 0, // Align top
          height: 200, // Match the height of the tab bar
        }}
        resizeMode="cover" // This will focus on the central part of the image
      />
      <View
        style={{
          position: 'absolute', // Use absolute to overlay on the background
          bottom: 0,
          left: 0,
          right: 0,
          height: 100, // Match the height of the tab bar
          backgroundColor: 'transparent', // Ensure transparency
        }}>
        <BottomTabBar
          className="border-0"
          {...props}
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
          }}
        />
      </View>
    </View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 100,
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'FeatureList') {
            iconName = 'featured-play-list';
          } else if (route.name === 'Profile') {
            iconName = 'settings';
          } else if (route.name === 'Dashboard') {
            iconName = 'analytics';
          } else {
            iconName = 'manage-search';
          }
          return (
            <MaterialIcons
              name={iconName}
              size={size}
              color={focused ? '#C5FF95' : '#FFFFFF'}
            />
          );
        },
      })}>
      {/* Define your screen components here */}
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="FeatureList" component={FeatureList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
