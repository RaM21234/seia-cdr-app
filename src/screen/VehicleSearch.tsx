// src/screens/SettingsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const VehicleSearch: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text className="text-white">Vehicle Search!</Text>
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

export default VehicleSearch;
