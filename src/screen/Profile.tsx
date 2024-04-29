import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {removeToken, getToken} from '../utils/storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    <View className="bg-white h-full">
      <View className="p-4">
        <Text className="text-lg text-black text-center">Settings</Text>
      </View>
      <View className="mx-5">
        <TouchableOpacity className="p-3 border-b border-gray-300 flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>

          <Text className="text-lg text-black">Account</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 border-b border-gray-300 flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black">Notifications</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 border-b border-gray-300 flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black">Appearance</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 border-b border-gray-300 flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black">Privacy & Security</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 border-b border-gray-300 flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black">Help and Support</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-3 flex flex-row border-b border-gray-300"
          onPress={handleGetToken}>
          <View className="mt-1 mr-3">
            <MaterialIcons name={'person'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black">Get Token</Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 border-gray-300 border-b  flex flex-row">
          <View className="mt-1 mr-3">
            <MaterialIcons name={'logout'} size={20} color={'black'} />
          </View>
          <Text className="text-lg text-black" onPress={handleRemoveToken}>
            Logout
          </Text>
          <View className="mt-1 ml-auto">
            <MaterialIcons name={'chevron-right'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
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
