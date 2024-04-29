import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import MyForm from './src/screen/LoginForm';
import HomeTabs from './src/navigation/HomeTabs';
import SplashScreen from './src/screen/SplashScreen';

export type RootStackParamList = {
  Login: undefined; // Assuming no parameters are needed for navigation to the Login screen
  HomeTabs: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="Splash"
      >
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Login" component={MyForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
