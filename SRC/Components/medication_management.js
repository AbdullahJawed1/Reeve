import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const App = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationSchedule, setMedicationSchedule] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleReminder = () => {
    if (!medicationName || !medicationSchedule || !phoneNumber) {
      Alert.alert('Please fill in all fields');
      return;
    }
    const message = `It's time for your medication, ${medicationName}. Shall I contact your pharmacy to arrange a refill?`;
    Alert.alert('Medication Reminder', message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medicationName}
        onChangeText={text => setMedicationName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Medication Schedule"
        value={medicationSchedule}
        onChangeText={text => setMedicationSchedule(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TouchableOpacity onPress={handleReminder} style={styles.button}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
