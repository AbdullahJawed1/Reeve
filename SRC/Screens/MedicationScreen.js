import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, FlatList } from 'react-native';

const MedicationScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationSchedule, setMedicationSchedule] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reminders, setReminders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleReminder = () => {
    if (!medicationName || !medicationSchedule || !phoneNumber) {
      Alert.alert('Please fill in all fields');
      return;
    }
    const newReminder = {
      id: Math.random().toString(),
      medicationName,
      medicationSchedule,
      phoneNumber,
    };
    setReminders(prevReminders => [...prevReminders, newReminder]);
    setMedicationName('');
    setMedicationSchedule('');
    setPhoneNumber('');
    setModalVisible(false);
  };

  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderText}>Medication: {item.medicationName}</Text>
        <Text style={styles.reminderText}>Schedule: {item.medicationSchedule}</Text>
        <Text style={styles.reminderText}>Phone: {item.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteReminder(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Reminders</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.partition}></View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
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
      </Modal>

      <View style={styles.partition}></View>

      <Text style={styles.subtitle}>Active Reminders</Text>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  addButton: {
    backgroundColor: '#20B2AA',
    padding: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#20B2AA',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4682B4',
  },
  reminderItem: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#F0FFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  partition: {
    borderBottomWidth: 2,
    borderBottomColor: '#4682B4',
    marginBottom: 20,
  },
});

export default MedicationScreen;
