import React from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, // Add this import for the loading indicator
} from 'react-native';

import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles'; // Ensure the styles file is correctly imported
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {storeToken} from '../utils/storage';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};
interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const MyForm: React.FC<Props> = ({navigation}) => {
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      console.log('Form Values:', values);
      try {
        // Here we make a POST request to your authentication API
        const response = await fetch(
          'https://development.seiasecure.com/api/v1/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        console.log('Login successful:', data);
        console.log('Token:', data.token);
        await storeToken(data.token);
        console.log('Token stored!');

        navigation.navigate('HomeTabs');

        formikHelpers.resetForm();
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        formikHelpers.setSubmitting(false);
      }

      formikHelpers.resetForm();
    } catch (error) {
      console.error(error);
      formikHelpers.setErrors({email: 'This email is already taken'});
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    // Inside the Formik component's render method

    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Customize size and color as needed
          ) : (
            <>
              <Text
                style={{
                  color: 'white',
                  marginTop: -160,
                  paddingHorizontal: 5,
                  fontSize: 26,
                  textAlign: 'center',
                  fontFamily: 'Arial',
                  marginBottom: 140,
                }}>
                C.A.T.C.H :
                <Text style={{fontSize: 19}}>
                  CDR enabled Advanced Tracking of Crime using High end
                  Technology
                </Text>
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#8ea5c9',
                  borderRadius: 20,
                  justifyContent: 'center',
                  padding: 20,
                  backgroundColor: '#1a3678',
                }}>
                <Text style={styles.heading}>Login</Text>
                <Text style={styles.inputtag}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <Text style={styles.inputtag}>Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <View className="flex flex-row my-2 ">
                  <BouncyCheckbox
                    fillColor="#0075ff"
                    innerIconStyle={{borderWidth: 2}}
                    iconStyle={{borderColor: 'white'}}
                    onPress={(isChecked: boolean) => {
                      console.log(isChecked);
                    }}
                  />
                  <Text>Remember me</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.buttonContainer}
                  disabled={isSubmitting}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.signup}>
                  <Text style={{color: 'grey'}}>Don't have an account?</Text>{' '}
                  Sign up{' '}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
    </Formik>
  );
};

export default MyForm;
