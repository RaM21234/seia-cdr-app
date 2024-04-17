// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['nativewind/babel'],
//   };
// };

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['nativewind/babel'],
};
