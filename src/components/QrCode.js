import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function QRCodeScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
        console.log(data);
      // Envoi de la valeur du QR code à l'API REST
      const userId = await AsyncStorage.getItem('mail');
      const response = await axios.post(`http://20.111.12.5:3000/users/ValidateApiKey?email=${userId}&key=${data}`);
      console.log(response.data);
      const token = await AsyncStorage.setItem('token', response.data.message);
      const keyapi = await AsyncStorage.setItem('keyapi', data);
      props.navigation.navigate('TabBar');
      
    } catch (error) {
      console.error(error);
    }
  };

  if (hasPermission === null) {
    return <Text>Demande d'autorisation pour utiliser la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Scanner un autre QR code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
