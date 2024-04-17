import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {removeToken, getToken} from '../utils/storage';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleRemoveToken = async () => {
    await removeToken();
    console.log('Token removed');

    // Navigate to the Login screen or reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleGetToken = async () => {
    const token = await getToken();
    console.log('Token ', token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile Screen</Text>
      <TouchableOpacity
        className="my-10"
        style={styles.button}
        onPress={handleGetToken}>
        <Text style={styles.text}>Get Token</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemoveToken}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
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
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#404056',
    borderRadius: 5,
  },
});

export default Profile;
