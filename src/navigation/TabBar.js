import * as React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/Items/ArticleList';
import Login from '../components/Login';
import QRCodeScanner from '../components/QrCode';
import CustomerList from '../components/Items/CustomerList';


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

let fullHeight = Dimensions.get('window').height;
let fullWidth = Dimensions.get("window").width;

export default function TabBar() {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Clients') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === "Liste d'Articles") {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Clients" component={CustomerList} />
        <Tab.Screen name="Liste d'Articles" component={ItemList} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({ 
    container: {
        width: fullWidth,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});