import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Ar from './src/components/ArModule';
import TabBar from './src/navigation/TabBar';
import * as Permissions from 'expo-permissions';

export default function App() {

  // const { status } = Permissions.askAsync(Permissions.CAMERA);
  // if (status !== 'granted') {
  //   alert('Permission to access camera was denied');
  // }

async function setCameraPermission() {
  const { status } = await Permissions.requestAsync(Permissions.CAMERA);
  if (status === 'granted') {
    console.log('Permission accordé');
  } else {
    console.log('Permission refusé');
  }
}

  return (
    <SafeAreaView style={styles.container}>
      {/* <Ar></Ar>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}

      <Ar></Ar>

      <TabBar />

    </SafeAreaView>
  );
}

let fullHeight = Dimensions.get('window').height;
let fullWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    height: fullHeight,
    width: fullWidth,
  },
});
