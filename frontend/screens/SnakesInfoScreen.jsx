import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SnakesInfoScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/snake-logs', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Fetch Logs Error: ', error.message);
      }
    };

    fetchLogs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Snake Identification Logs</Text>
      </View>
      <FlatList
        data={logs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.text}>User: {item.username}</Text>
            <Text style={styles.text}>Prediction: {item.prediction}</Text>
            <Text style={styles.text}>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#E8F5E9' },
  header: {
    backgroundColor: '#4CAF50',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 30
  },
  headerText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  logItem: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10, width: '100%' },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  text: { fontSize: 18, color: '#333', marginVertical: 5 },
  button: { width: '100%', padding: 15, marginVertical: 10, borderRadius: 8, backgroundColor: '#4CAF50', alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center' },
});

export default SnakesInfoScreen;
