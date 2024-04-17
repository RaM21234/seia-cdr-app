// src/screens/NumberSearchScreen.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import styles from '../styles/styles';
import {getToken} from '../utils/storage';

interface PhoneNumberSearchProps {}

interface FormValues {
  phoneNumber: string;
}

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, 'Only digits are allowed')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
});

const NumSearch: React.FC<PhoneNumberSearchProps> = props => {
  const [searchResult, setsearchResult] = useState<any>(null);

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      console.log('Phone Number:', values.phoneNumber.slice(-10));
      const token = await getToken();
      // Check if token is not null and is a string; otherwise, handle the case (e.g., show an error or redirect to login)
      if (typeof token !== 'string') {
        console.error('Authentication token is missing or invalid.');
        // You might want to add some error handling logic here, such as showing an error message or redirecting to a login screen.
        formikHelpers.setSubmitting(false);
        return;
      }

      const apiResponse = await fetch(
        `https://development.seiasecure.com/api/v1/user/number_info`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({number: values.phoneNumber.slice(-10)}),
        },
      );

      const data = await apiResponse.json();
      if (!apiResponse.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Search successful:', data?.data);
      setsearchResult(data?.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{phoneNumber: ''}}
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
          <View className="border border-white py-10 px-10 rounded-xl">
            <Text style={styles.heading} className="mb-10">
              {' '}
              Number Search
            </Text>
            <View className="mt-7">
              <Text style={styles.inputtag}>Phone Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Enter phone number"
                keyboardType="numeric"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.buttonContainer}
                disabled={isSubmitting}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              {isSubmitting && (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
          </View>

          {searchResult && (
            <ScrollView className="mx-auto mt-5 border-2 border-blue-400 w-full rounded-lg">
              <View className="bg-[rgba(0,88,191,0.15)] shadow-[2px_2px_6px_rgba(0,0,0,0.15)] border-[3px_solid_rgba(0,88,191,1)] rounded-xl max-w-[650px]">
                <View className="bg-[rgba(0,88,191,0.15)] shadow-[2px_2px_6px_rgba(0,0,0,0.15)]">
                  <View className="flex flex-col items-start text-white p-3 pt-2">
                    <View className="w-full flex items-center justify-center mt-8">
                      {searchResult.image ? (
                        <View>
                          <Image
                            source={{uri: searchResult.image}}
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 80,
                              borderWidth: 13,
                              borderColor: 'rgba(0, 88, 191, 1)',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => console.log('Search Image')}
                            className="btn btn-primary mt-2 border mx-auto px-4 py-2 rounded-xl bg-blue-500">
                            <Text className="text-white">Search Image</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View className="w-[120px] h-[120px] rounded-full flex items-center justify-center bg-gray-300 text-gray-900 border-8 border-blue-500">
                          <Text>No image available</Text>
                        </View>
                      )}
                      <Text className="p-2 text-3xl text-white">
                        {searchResult?.name}
                      </Text>
                    </View>
                    <View className="w-full flex items-center justify-between">
                      <View className="border border-gray-600 w-[90%] mx-auto my-2" />
                      <Text>Info</Text>
                      {/* personal info */}
                      <View className="flex flex-col items-start ml-10    justify-center p-2  w-full">
                        <Text className="text-gray-300 text-sm">
                          Mobile No.:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.phones?.[0]?.e164Format}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Company:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.phones?.[0]?.carrier}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Number Type:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.phones?.[0]?.numberType || 'N/A'}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Country Code:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.addresses?.[0]?.countryCode || 'N/A'}
                          </Text>
                        </Text>
                      </View>
                      <View className="border border-gray-600 w-[90%] mx-auto my-2" />
                      {/* address */}
                      <Text>Address</Text>
                      <View className="flex flex-col items-start ml-10    justify-center p-2 w-full">
                        <Text className="text-gray-300 text-sm">
                          City:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.addresses?.[0]?.city}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Country:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.addresses?.[0]?.countryCode}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Time Zone:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.addresses?.[0]?.timeZone}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Access:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.access}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </Formik>
  );
};

export default NumSearch;
