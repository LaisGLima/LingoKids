import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import AlimentosScreen from './components/abas/AlimentosScreen';
import AnimaisScreen from './components/abas/AnimaisScreen';
import CategoriasScreen from './components/abas/CategoriasScreen';
import ConfiguracaoScreen from './components/abas/ConfiguracaoScreen';
import ControleParentalScreen from './components/abas/ControleParentalScreen';
import CoresScreen from './components/abas/CoresScreen';
import HomeScreen from './components/abas/HomeScreen';
import LetrasScreen from './components/abas/LetrasScreen';
import LinguagensScreen from './components/abas/LinguagensScreen';
import NumerosScreen from './components/abas/NumerosScreen';
import PartesDoCorpoScreen from './components/abas/PartesDoCorpoScreen';
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
          <Stack.Screen name="Alimentos" component={AlimentosScreen} />
          <Stack.Screen name="Animais" component={AnimaisScreen} />
          <Stack.Screen name="Categorias" component={CategoriasScreen} />
          <Stack.Screen name="Controle Parental" component={ControleParentalScreen} />
          <Stack.Screen name="Cores" component={CoresScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Letras" component={LetrasScreen} />
          <Stack.Screen name="Linguagens" component={LinguagensScreen} />
          <Stack.Screen name="Numeros" component={NumerosScreen} />
          <Stack.Screen name="ParteDoCorpo" component={PartesDoCorpoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
