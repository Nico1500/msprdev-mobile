import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Récupération de l'ID utilisateur dans AsyncStorage
        const usermail = await AsyncStorage.getItem('mail');
        const usermdp = await AsyncStorage.getItem('mdp');

        console.log(usermail);
        console.log(usermdp);
	
        if (usermail !== null && usermdp !== null) {
          // Envoi de l'ID utilisateur à l'API REST pour se connecter
          const response = await axios.get(`http://20.111.12.5:3000/users/login?email=${usermail}&password=${usermdp}`);
          // Traitement de la réponse de l'API REST ici
          console.log(response.data);
          if (response.data === 'OK') {
            //setLoggedIn(true);
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

  const handleLogin = async () => {

    const usermail = await AsyncStorage.setItem('mail', username);
    const mdpuser = await AsyncStorage.setItem('mdp', password);
    const response = await axios.get(`http://20.111.12.5:3000/users/login?email=${username}&password=${password}`);
    // Traitement de la réponse de l'API REST ici
    console.log(response.data);
    
    if (response.data.message === "Vous devez valider votre clé API avant de vous connecter.") {
      props.navigation.navigate('qrcode');
    }
    //props.navigation.navigate('TabBar');
  };

  const handleSignup = () => {
    // Rediriger vers l'écran d'inscription
    props.navigation.navigate('Signup');
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
              placeholder="Email"
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
            <Button
              title="S'inscrire"
              onPress={handleSignup}
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