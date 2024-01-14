import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import DOLreading from '../../components/DailyReading';

export default function TabOneScreen() {
  const today = new Intl.DateTimeFormat('en', { weekday: 'long' }).formatToParts(new Date())[0].value
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DOLreading season="epiphany" week="2" day={today} />
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
