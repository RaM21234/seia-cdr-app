// src/MyTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NumSearch from '../screen/NumSearch';
import VehicleSearch from '../screen/VehicleSearch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../screen/Profile';
import Dashboard from '../screen/Dashboard';

type RootTabParamList = {
  NumSearch: undefined;
  VehicleSearch: undefined;
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
          if (route.name === 'NumSearch') {
            iconName = 'manage-search';
          } else if (route.name === 'VehicleSearch') {
            iconName = 'directions-car';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          } else if (route.name === 'Dashboard') {
            iconName = 'analytics';
          }
          const iconColor = focused ? '#FFFFFF' : '#C5FF95';
          return (
            <MaterialIcons name={iconName} size={size} color={iconColor} />
          );
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="NumSearch" component={NumSearch} />
      <Tab.Screen name="VehicleSearch" component={VehicleSearch} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
