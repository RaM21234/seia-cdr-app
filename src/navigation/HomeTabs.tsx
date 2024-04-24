// src/MyTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NumSearch from '../screen/NumSearch';
import VehicleSearch from '../screen/VehicleSearch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../screen/Profile';
import Dashboard from '../screen/Dashboard';
import FeatureList from './FeatureList';

type RootTabParamList = {
  FeatureList: undefined;

  Profile: undefined;
  Dashboard: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {height: 60, backgroundColor: '#0E46A3'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'manage-search';
          if (route.name === 'FeatureList') {
            iconName = 'featured-play-list';
          } else if (route.name === 'Profile') {
            iconName = 'settings';
          } else if (route.name === 'Dashboard') {
            iconName = 'analytics';
          }
          const iconColor = focused ? '#C5FF95' : '#FFFFFF';
          return (
            <MaterialIcons name={iconName} size={size} color={iconColor} />
          );
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="FeatureList" component={FeatureList} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
