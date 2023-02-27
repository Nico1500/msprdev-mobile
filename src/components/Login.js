import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Récupération de l'ID utilisateur dans AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Envoi de l'ID utilisateur à l'API REST pour se connecter
          const response = await axios.get('https://localhost:3000/getSession', { userId: userId });
          // Traitement de la réponse de l'API REST ici
          console.log(response.data);
          if (response.data === 'OK') {
            setLoggedIn(true);
          }
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      // Naviguer vers l'écran d'accueil après 1 seconde
      const timeoutId = setTimeout(() => {
        props.navigation.navigate('TabBar');
      }, 1000);

      // Nettoyage du délai d'attente pour éviter les fuites de mémoire
      return () => clearTimeout(timeoutId);
    }
  }, [loggedIn]);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Vérification des informations d'identification ici, par exemple en appelant une API REST
    // Si les informations d'identification sont correctes, naviguez vers l'écran d'accueil
    props.navigation.navigate('TabBar');
  };

  return (
    <View style={styles.container}>
      <>{loggedIn 
        ? 
          <View style={styles.container}>
           <Text style={styles.text}>Bienvenue sur l'application</Text>
           <Text style={styles.text}>Chargement...</Text>
          </View> 
        : 
          <>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              onChangeText={handleUsernameChange}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <Button
              title="Se connecter"
              onPress={handleLogin}
            />
          </>
        }
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default Login;