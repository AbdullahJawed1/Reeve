import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const messageInputRef = useRef(null);

  // Function to send a message
  const sendMessage = () => {
    if (message.trim() === '') {
      return; // Don't send empty message
    }
    const newMessage = { text: message, image: selectedImage };
    setMessages([...messages, newMessage]);
    setMessage('');
    setSelectedImage(null);
    messageInputRef.current.clear(); // Clear text input
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
      {/* Display messages */}
      <ScrollView style={styles.messageContainer}>
        {messages.map((item, index) => (
          <View key={index} style={styles.messageItem}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
          </View>
        ))}
      </ScrollView>

      {/* Input section */}
      <View style={styles.inputContainer}>
        <TextInput
          ref={messageInputRef}
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={openImagePicker} style={styles.imageButton}>
          <AntDesign name="picture" size={24} color="white" />
        </TouchableOpacity>
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
});

export default ChatScreen;
