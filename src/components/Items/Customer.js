import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Customer = (props) => {
const { name, username, address, profile, company, orders } = props;

return (
        <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.address}>
        {address.postalCode}, {address.city}
        </Text>
        <Text style={styles.profile}>
        {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.company}>{company.companyName}</Text>
        <Text style={styles.id}>{orders} commandes</Text>
        </View>
    );
    };

const styles = StyleSheet.create({
container: {
backgroundColor: '#FFF',
padding: 10,
marginBottom: 20,
borderRadius: 10,
borderWidth: 1,
borderColor: 'orange',
},
name: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 5,
},
username: {
fontSize: 14,
marginBottom: 5,
},
address: {
fontSize: 14,
marginBottom: 5,
},
profile: {
fontSize: 14,
marginBottom: 5,
},
company: {
fontSize: 14,
marginBottom: 5,
},
id: {
fontSize: 14,
marginBottom: 5,
},
});

export default Customer;