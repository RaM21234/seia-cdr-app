import {ImageBackground, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const SplashScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 2000);
  }, []);
  return (
    <ImageBackground
      source={require('../assets/welcome.jpg')}
      className="flex-1 justify-center items-center">
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        className="flex-1 justify-center items-center">
        <Text className="text-white text-5xl font-bold text-center mx-auto ">
          Welcome
        </Text>
        <Text className="text-white text-5xl font-bold text-center mx-auto">
          to
        </Text>
        <Text className="text-white text-5xl font-bold text-center mx-auto">
          C.A.T.C.H.
        </Text>
      </Animatable.View>
    </ImageBackground>
  );
};

export default SplashScreen;
