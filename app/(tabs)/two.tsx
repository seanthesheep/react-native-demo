import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import Countdown from '../../components/Countdown';

const date = new Date("2024-06-20");

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown Timer</Text>
      <Countdown title="Countdown to Summer" targetDate={date} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
