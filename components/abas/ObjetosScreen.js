import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';

const ObjetosScreen = () => {
  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} style={styles.container}>
      <VoltarScreen />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ObjetosScreen;