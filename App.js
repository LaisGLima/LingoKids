import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import AlimentosPScreen from './components/abas/AlimentosPScreen';
import AlimentosIScreen from './components/abas/AlimentosIScreen';
import AlimentosEScreen from './components/abas/AlimentosEScreen';
import AnimaisPScreen from './components/abas/AnimaisPScreen';
import AnimaisIScreen from './components/abas/AnimaisIScreen';
import AnimaisEScreen from './components/abas/AnimaisEScreen';
import CategoriasScreen from './components/abas/CategoriasScreen';
import ConfiguracaoScreen from './components/abas/ConfiguracaoScreen';
import ControleParentalScreen from './components/abas/ControleParentalScreen';
import CoresPScreen from './components/abas/CoresPScreen';
import CoresIScreen from './components/abas/CoresIScreen';
import CoresEScreen from './components/abas/CoresEScreen';
import HomeScreen from './components/abas/HomeScreen';
import LetrasPScreen from './components/abas/LetrasPScreen';
import LetrasIScreen from './components/abas/LetrasIScreen';
import LetrasEScreen from './components/abas/LetrasEScreen';
import LinguagensScreen from './components/abas/LinguagensScreen';
import NumerosPScreen from './components/abas/NumerosPScreen';
import NumerosIScreen from './components/abas/NumerosIScreen';
import NumerosEScreen from './components/abas/NumerosEScreen';
import PartesDoCorpoPScreen from './components/abas/PartesDoCorpoPScreen';
import PartesDoCorpoIScreen from './components/abas/PartesDoCorpoIScreen';
import PartesDoCorpoEScreen from './components/abas/PartesDoCorpoEScreen';
import { OptionProvider } from './components/abas/OptionContext';
import LockScreen from './components/abas/LockScreen'; 
import { LockProvider, useLock } from './components/abas/LockContext'; 
import { LanguageProvider } from './components/context/LanguageContext';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './components/database/dbConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createStackNavigator();

const App = () => {
  const [sound, setSound] = useState();

  useEffect(() => {
    let soundObject = null;

    const playSound = async () => {
      try {
        soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('./assets/sons/trilha.wav'), { isLooping: true });
        setSound(soundObject);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    };

    playSound();

    return () => {
      if (soundObject) {
        soundObject.stopAsync();
        soundObject.unloadAsync();
      }
    };
  }, []);

  const stopAlarm = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <LanguageProvider>
      <LockProvider>
        <OptionProvider>
          <NavigationContainer>
            <Navigation stopAlarm={stopAlarm} />
            <ConfiguracaoScreen soundObject={sound} toggleSound={stopAlarm} />
          </NavigationContainer>
        </OptionProvider>
      </LockProvider>
    </LanguageProvider>
  );
};

const Navigation = ({ stopAlarm }) => {
  const { isLocked } = useLock();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      {isLocked ? (
        <Stack.Screen name="LockScreen" component={LockScreen} />
      ) : (
        <>
          <Stack.Screen name="AlimentosP" component={AlimentosPScreen} />
          <Stack.Screen name="AlimentosI" component={AlimentosIScreen} />
          <Stack.Screen name="AlimentosE" component={AlimentosEScreen} />
          <Stack.Screen name="AnimaisP" component={AnimaisPScreen} />
          <Stack.Screen name="AnimaisI" component={AnimaisIScreen} />
          <Stack.Screen name="AnimaisE" component={AnimaisEScreen} />
          <Stack.Screen name="Categorias" component={CategoriasScreen} />
          <Stack.Screen name="Controle Parental" component={ControleParentalScreen} />
          <Stack.Screen name="CoresP" component={CoresPScreen} />
          <Stack.Screen name="CoresI" component={CoresIScreen} />
          <Stack.Screen name="CoresE" component={CoresEScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LetrasP" component={LetrasPScreen} />
          <Stack.Screen name="LetrasI" component={LetrasIScreen} />
          <Stack.Screen name="LetrasE" component={LetrasEScreen} />
          <Stack.Screen name="Linguagens" component={LinguagensScreen} />
          <Stack.Screen name="NumerosP" component={NumerosPScreen} />
          <Stack.Screen name="NumerosI" component={NumerosIScreen} />
          <Stack.Screen name="NumerosE" component={NumerosEScreen} />
          <Stack.Screen name="ParteDoCorpoP" component={PartesDoCorpoPScreen} />
          <Stack.Screen name="ParteDoCorpoI" component={PartesDoCorpoIScreen} />
          <Stack.Screen name="ParteDoCorpoE" component={PartesDoCorpoEScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
