import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signup: {
    color: 'white',
    marginTop: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  heading: {
    color: 'white', // Use a softer red for headings
    marginBottom: 8, // Space below the heading
    paddingHorizontal: 5, // Spacing to the sides of the text
    fontSize: 26, // Font size for headings
    textAlign: 'center', // Center text horizontally
    fontFamily: 'Arial', // Assuming Arial is available, otherwise replace with your custom font
    fontWeight: 'bold',
  },

  container: {
    borderColor: 'black', // Color of the border
    flex: 1,
    justifyContent: 'center', // Align items vertically at the center of the screen
    padding: 20,
    backgroundColor: '#161633', // Deep blue background color
  },

  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc', // Lighter grey border for inputs
    padding: 12,
    borderRadius: 20, // Rounded corners for text input
    fontSize: 16, // Larger font size for better readability
    marginBottom: 15,
    backgroundColor: '#fff', // White background for text inputs
  },
  error: {
    color: '#ff6b6b', // Use a softer red for error messages
    marginBottom: 8, // Space below the error message
    paddingHorizontal: 5, // Spacing to the sides of the text
    fontSize: 14, // Slightly smaller font size for errors
  },
  inputtag: {
    color: 'white', // Use a softer red for error messages
    marginBottom: 8, // Space below the error message
    paddingHorizontal: 5, // Spacing to the sides of the text
    fontSize: 14, // Slightly smaller font size for errors
    borderRadius: 20,
  },
  buttonContainer: {
    elevation: 2, // Slight shadow for Android
    backgroundColor: '#0075ff', // A pleasant green background for the button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
  },
  buttonText: {
    color: '#ffffff', // White text for the button
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Center text in the button
  },
});

export default styles;
