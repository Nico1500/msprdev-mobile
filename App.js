import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation'

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StackNavigation />
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
