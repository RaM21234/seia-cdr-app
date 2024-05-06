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
    <View className="flex-1 bg-white ">
      <TouchableOpacity
        className="bg-white text-black border border-gray-300   py-4 px-4 mt-4  rounded-2xl mx-2"
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
        <View
          className="absolute  bg-white  border-t-0 border-b   border-gray-300 rounded-b-lg w-[94%] left-3 z-10  "
          style={{marginTop: 73}}>
          {formTypesArray.map((item, index) => {
            return (
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
                <View
                  className={`border-t-0 border-b ${
                    index == formTypesArray.length - 1 ? 'border-b-0' : ''
                  } border-gray-300 w-[100%] mx-auto my-1`}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <View className="flex-1 w-full mt-0">{renderForm()}</View>
    </View>
  );
};

export default FeatureList;
