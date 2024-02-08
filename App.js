import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Navbar from './SRC/Components/navbar';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>REEVE</Text>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50', // Green background color
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'center',
    height: 60, // Slim header height
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase', // Uppercase the app name
    letterSpacing: 2, // Increase letter spacing for a futuristic look
  },
});

export default App;
