import * as React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../components/Items/ItemList';
import Login from '../components/Login';


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

            if (route.name === 'Profil') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Liste') {
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
        <Tab.Screen name="Profil" component={Login} />
        <Tab.Screen name="Liste" component={ItemList} />
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