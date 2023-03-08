import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Signup = (props) => {
const [name, setName] = useState('');
const [mail, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleUsernameChange = (text) => {
setUsername(text);
};

const handlePasswordChange = (text) => {
setPassword(text);
};

const handleNameChange = (text) => {
    setName(text);
};
    
const handleMailChange = (text) => {
    setEmail(text);
};

const handleSignup = async () => {
try {
// Envoi des informations d'inscription à l'API REST
const response = await axios.post(`http://20.111.12.5:3000/users/register?email=${mail}&profile=revendeur&password=${password}`);
// Traitement de la réponse de l'API REST ici
console.log(response.data);
// Naviguer vers l'écran d'accueil
props.navigation.navigate('Login');
} catch (error) {
console.error(error);
}
};

const handleLogin = () => {
    // Rediriger vers l'écran d'inscription
    props.navigation.navigate('Login');
  };

return (
    <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>
        <TextInput
            style={styles.input}
            placeholder="nom"
            secureTextEntry={false}
            onChangeText={handleNameChange}
            value={name}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            secureTextEntry={false}
            onChangeText={handleMailChange}
            value={mail}
        />
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
            title="S'inscrire"
            onPress={handleSignup}
        />

        <Button
            title="Revenir à la connexion"
            onPress={handleLogin}
        />
    </View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
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

export default Signup;



