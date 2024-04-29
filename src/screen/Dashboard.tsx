// src/screens/HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Dashboard: React.FC = () => {
  return (
    <View className=" " style={styles.container}>
      <Text className="text-white">User Dashboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161633',
  },
});

export default Dashboard;
