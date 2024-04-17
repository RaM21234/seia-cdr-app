import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import MyForm from './src/screen/LoginForm';
import HomeTabs from './src/navigation/HomeTabs';

export type RootStackParamList = {
  Login: undefined; // Assuming no parameters are needed for navigation to the Login screen
  HomeTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          // options={{title: 'Home Tabs'}}
        />
        <Stack.Screen
          name="Login"
          component={MyForm}
          // options={{title: 'Login'}}
        />
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
