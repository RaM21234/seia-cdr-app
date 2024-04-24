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
import {Alert} from 'react-native';

interface PhoneNumberSearchProps {}

interface FormValues {
  phoneNumber: string;
}

interface PhoneDetails {
  e164Format: string;
  numberType: string;
  nationalFormat: string;
  dialingCode: number;
  countryCode: string;
  carrier: string;
  type: string;
}

interface AddressDetails {
  address: string;
  city: string;
  countryCode: string;
  timeZone: string;
  type: string;
}

interface InternetAddress {
  id: string;
  service: string;
  caption: string;
  type: string;
}

interface ApiResponseData {
  image: string;
  id: string;
  name: string;
  imId: string;
  gender: string;
  score: number;
  access: string;
  enhanced: boolean;
  phones: PhoneDetails[];
  addresses: AddressDetails[];
  internetAddresses: InternetAddress[];
  badges: string[];
  tags: any[];
  sources: any[];
  searchWarnings: any[];
  commentsStats: {
    showComments: boolean;
  };
  manualCallerIdPrompt: boolean;
}

interface ApiResponse {
  success: boolean;
  status: number;
  data: ApiResponseData;
  message: string;
}

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, 'Only digits are allowed')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
});

const NumSearch: React.FC = () => {
  const [searchResult, setSearchResult] = useState<ApiResponseData | null>(
    null,
  );

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    formikHelpers.setSubmitting(true);

    const token = await getToken();
    if (typeof token !== 'string' || !token.trim()) {
      Alert.alert('Error', 'Authentication token is missing or invalid.');
      formikHelpers.setSubmitting(false);
      return;
    }

    try {
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

      const data: ApiResponse = await apiResponse.json(); // Using the ApiResponse type for response
      if (!apiResponse.ok) {
        throw new Error(data.message || 'Unable to fetch details');
      }

      console.log('Search successful:', data.data);
      setSearchResult(data.data);
    } catch (error: any) {
      console.error('Search failed:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
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
          <View className=" px-10 rounded-xl">
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
                            {searchResult.phones[0].e164Format}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Gender:{' '}
                          <Text className="font-bold text-base">
                            {searchResult.gender}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Company:{' '}
                          <Text className="font-bold text-base">
                            {searchResult.phones[0].carrier}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Number Type:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.phones[0]?.numberType || 'N/A'}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Country Code:{' '}
                          <Text className="font-bold text-base">
                            {searchResult.phones[0].countryCode}
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
                            {searchResult.addresses[0].city}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Country:{' '}
                          <Text className="font-bold text-base">
                            {searchResult.phones[0].countryCode}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Time Zone:{' '}
                          <Text className="font-bold text-base">
                            {searchResult.addresses[0].timeZone}
                          </Text>
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          Access:{' '}
                          <Text className="font-bold text-base">
                            {searchResult?.access}
                          </Text>
                        </Text>
                      </View>

                      <View className="border border-gray-600 w-[90%] mx-auto my-2" />

                      {/*Internet address */}
                      <Text>Internet Address</Text>
                      <View className="flex flex-col items-start ml-10    justify-center p-2 w-full">
                        {searchResult.internetAddresses.map(
                          (internetAddress, index) => (
                            <View key={index}>
                              <Text className="text-gray-300 text-sm">
                                Service Type:{' '}
                                <Text className="font-bold text-base">
                                  {internetAddress.service}
                                </Text>
                              </Text>
                              <Text className="text-gray-300 text-sm">
                                Email :{' '}
                                <Text className="font-bold text-base">
                                  {internetAddress.id}
                                </Text>
                              </Text>
                            </View>
                          ),
                        )}
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
