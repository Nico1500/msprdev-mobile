import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Ar from './src/components/ArModule';
import TabBar from './src/navigation/TabBar';
import {Camera} from 'expo-camera';
import CamTest from './src/navigation/CamTest'
import ArTest from './src/components/artest'


export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  console.log(permission);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Ar></Ar>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}

      <ArTest />
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
