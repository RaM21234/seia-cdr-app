import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NumSearch from '../screen/NumSearch';
import VehicleSearch from '../screen/VehicleSearch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

enum FormTypes {
  NUMBER_SEARCH = 'Number Search',
  VEHICLE_SEARCH = 'Vehicle Search',
}

const FeatureList: React.FC = () => {
  const formTypesArray = [
    {label: 'Number Search', value: FormTypes.NUMBER_SEARCH},
    {label: 'Vehicle Search', value: FormTypes.VEHICLE_SEARCH},
  ];

  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderForm = () => {
    switch (formTypesArray[currentFormIndex].value) {
      case FormTypes.NUMBER_SEARCH:
        return <NumSearch />;
      case FormTypes.VEHICLE_SEARCH:
        return <VehicleSearch />;
      default:
        return <Text className="text-xl">No form selected</Text>;
    }
  };

  return (
    <View className="flex-1 bg-[#161633] ">
      <TouchableOpacity
        className="bg-white text-black shadow-xl py-4 px-4 mt-4  rounded-2xl"
        onPress={() => setDropdownOpen(!dropdownOpen)}>
        <View className=" flex flex-row ">
          <Text className="text-black   mr-auto">
            {formTypesArray[currentFormIndex].label}
          </Text>
          <MaterialIcons
            name={`${dropdownOpen ? 'expand-less' : 'expand-more'}`}
            size={19}
            color={'black'}
          />
        </View>
      </TouchableOpacity>
      {dropdownOpen && (
        <View className="absolute border-t-0 bg-white mt-20 border-b border-gray-300 rounded-md w-full z-10 p-3">
          {formTypesArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="px-2 hover:bg-blue-100"
              onPress={() => {
                setCurrentFormIndex(index);
                setDropdownOpen(false);
              }}>
              <Text className="text-center text-gray-700 my-2">
                {item.label}
              </Text>
              <View className="border-t-0 border-b border-gray-300 w-[100%] mx-auto my-1" />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View className="flex-1 w-full mt-0">{renderForm()}</View>
    </View>
  );
};

export default FeatureList;
