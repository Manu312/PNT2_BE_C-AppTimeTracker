import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ onPress, title }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fb5b5a',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
