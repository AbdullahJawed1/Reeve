import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const MemoryJournalScreen = () => {
  const [memory, setMemory] = useState('');
  const [memories, setMemories] = useState([]);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const memoryInputRef = useRef(null);

  // Function to save the memory
  const saveMemory = () => {
    if (memory.trim() === '') {
      return; // Don't save empty memory
    }
    const newMemory = { text: memory, image: selectedImage };
    setMemories([...memories, newMemory]);
    setMemory('');
    setSelectedImage(null);
    memoryInputRef.current.clear(); // Clear text input
  };

  // Function to toggle showing the add memory section
  const toggleAddMemory = () => {
    setShowAddMemory(!showAddMemory);
  };

  // Function to open image picker
  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memories</Text>
      
      {/* Plus button to toggle add memory section */}
      <TouchableOpacity style={styles.plusButton} onPress={toggleAddMemory}>
        <AntDesign name={showAddMemory ? 'minus' : 'plus'} size={24} color="white" />
      </TouchableOpacity>
      
      {/* Add memory section */}
      {showAddMemory && (
        <View style={styles.addMemorySection}>
          <TextInput
            ref={memoryInputRef}
            style={styles.input}
            multiline
            placeholder="Add your memory here..."
            value={memory}
            onChangeText={setMemory}
          />
          <Button title="Add Picture" onPress={openImagePicker} color="#4CAF50" />
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
          <Button title="Save Memory" onPress={saveMemory} color="#1976D2" />
        </View>
      )}
      
      {/* Display saved memories */}
      <ScrollView style={styles.memoryContainer}>
        {memories.map((item, index) => (
          <View key={index} style={styles.memoryItem}>
            <Text style={styles.memoryText}>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.memoryImage} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#1976D2',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addMemorySection: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 80, // Reduced height
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 14, // Smaller font size
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  memoryContainer: {
    flex: 1,
  },
  memoryItem: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  memoryText: {
    fontSize: 16,
    color: '#333333',
  },
  memoryImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default MemoryJournalScreen;
