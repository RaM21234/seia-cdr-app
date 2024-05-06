// src/screens/SettingsScreen.tsx
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
  vehicleNumber: string;
}

interface VehicleDetails {
  state_cd: string;
  rc_regn_no: string;
  rc_regn_dt: string;
  rc_chasi_no: string;
  rc_eng_no: string;
  rc_vh_class_desc: string;
  rc_maker_desc: string;
  rc_maker_model: string;
  rc_manu_month_yr: string;
  rc_gvw: number;
  rc_cubic_cap: number;
  rc_seat_cap: number;
  rc_owner_name: string;
  rc_permanent_address: string;
  rc_fit_upto: string;
  rc_insurance_comp: string;
  rc_insurance_upto: string;
  rc_registered_at: string;
  rc_blacklist_status: string;
  rc_status: string;
  rc_vehicle_type: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    vehicleDetails: VehicleDetails;
  };
  message: string;
}

const validationSchema = Yup.object({
  vehicleNumber: Yup.string()
    .matches(
      /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/i,
      'Invalid vehicle number format',
    ) // Note the 'i' flag here
    .required('Vehicle number is required'),
});

const VehicleSearch: React.FC = () => {
  const [searchResult, setSearchResult] = useState<VehicleDetails | any>(null);

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    console.log('Phone Number:', values.vehicleNumber);
    try {
      formikHelpers.setSubmitting(true);
      const token = await getToken();
      // Check if token is not null and is a string; otherwise, handle the case (e.g., show an error or redirect to login)
      if (typeof token !== 'string') {
        console.error('Authentication token is missing or invalid.');
        formikHelpers.setSubmitting(false);
        return;
      }
      const apiResponse = await fetch(
        `https://development.seiasecure.com/api/v1/user/get_vehicle_info`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({number: values.vehicleNumber}),
        },
      );

      const data = await apiResponse.json();
      if (!apiResponse.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log(
        'Search successful:',
        data.data.data.vehicleDetails.Data.result,
      );
      const vehicleData = data.data.data.vehicleDetails.Data.result;
      setSearchResult(vehicleData);
      console.log('final data to map ', searchResult);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{vehicleNumber: ''}}
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
            <Text className=" text-center text-4xl text-black font-extrabold">
              Vehicle Search
            </Text>
            <View className="mt-7">
              <Text className="text-black mb-2 text-base p-3">
                Vehicle Number
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('vehicleNumber')}
                onBlur={handleBlur('vehicleNumber')}
                value={values.vehicleNumber}
                placeholder="Enter Vehicle number"
              />
              {touched.vehicleNumber && errors.vehicleNumber && (
                <Text style={styles.error}>{errors.vehicleNumber}</Text>
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
            <ScrollView className="mx-auto mt-5 border-2 border-[#08b3ad] w-full rounded-lg">
              <View className="bg-[rgba(0,88,191,0.15)] shadow-[2px_2px_6px_rgba(0,0,0,0.15)] border-[3px_solid_rgba(0,88,191,1)] rounded-xl max-w-[650px]">
                <View className="bg-[rgba(0,88,191,0.15)] shadow-[2px_2px_6px_rgba(0,0,0,0.15)]">
                  <View className="flex flex-col items-start text-white p-3 pt-2 w-[90%] mx-auto">
                    <Text className="p-2 text-3xl text-black mx-auto">
                      Vehicle Details
                    </Text>

                    <View className="border border-[#08b3ad] w-[90%] mx-auto my-2" />
                    <View className="my-2">
                      <Text className="mx-auto mb-2 text-black">Info</Text>
                      <Text className="text-sm text-black">
                        Owner:{' '}
                        <Text className="font-bold text-base text-black">
                          {searchResult.rc_owner_name}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Address:{' '}
                        <Text className="font-bold text-base text-black">
                          {searchResult.rc_permanent_address}
                        </Text>
                      </Text>
                    </View>

                    <View className="border border-[#08b3ad] w-[90%] mx-auto my-2 " />
                    <View className="my-2">
                      <Text className="mx-auto mb-2 text-black">
                        Vehicle Details
                      </Text>

                      <Text className="text-black text-sm">
                        Registration Number:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_regn_no}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Chassis Number:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_chasi_no}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Engine Number:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_eng_no}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Vehicle Type:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_vh_class_desc}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Manufacturer:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_maker_desc}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Model:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_maker_model}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Manufacturing Date:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_manu_month_yr}
                        </Text>
                      </Text>

                      <Text className="text-black text-sm">
                        Insurance Company:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_insurance_comp}
                        </Text>
                      </Text>
                      <Text className="text-black text-sm">
                        Insurance Valid Upto:{' '}
                        <Text className="font-bold text-base">
                          {searchResult.rc_insurance_upto}
                        </Text>
                      </Text>
                    </View>
                    <View className="border border-[#08b3ad] w-[90%] mx-auto my-2" />
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

export default VehicleSearch;
