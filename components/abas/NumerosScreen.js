import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { useLanguage } from '../context/LanguageContext'; // Verifique o caminho

const NumerosScreen = ({ navigation }) => {
  const { language, audios } = useLanguage();

  const numeros = [
    { id: 0, name: '0', image: require('../../assets/imagens/numeros/0.png') },
    { id: 1, name: '1', image: require('../../assets/imagens/numeros/1.png') },
    { id: 2, name: '2', image: require('../../assets/imagens/numeros/2.png') },
    { id: 3, name: '3', image: require('../../assets/imagens/numeros/3.png') },
    { id: 4, name: '4', image: require('../../assets/imagens/numeros/4.png') },
    { id: 5, name: '5', image: require('../../assets/imagens/numeros/5.png') },
    { id: 6, name: '6', image: require('../../assets/imagens/numeros/6.png') },
    { id: 7, name: '7', image: require('../../assets/imagens/numeros/7.png') },
    { id: 8, name: '8', image: require('../../assets/imagens/numeros/8.png') },
    { id: 9, name: '9', image: require('../../assets/imagens/numeros/9.png') },
    { id: 10, name: '10', image: require('../../assets/imagens/numeros/10.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numerosPorPagina = 6;
  const totalPages = Math.ceil(numeros.length / numerosPorPagina);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * numerosPorPagina;
  const endIndex = Math.min(startIndex + numerosPorPagina, numeros.length);
  const numerosPaginados = numeros.slice(startIndex, endIndex);

  const playAudio = async (numeroName) => {
    const soundObject = new Audio.Sound();
    setLoading(true);
    try {
      await soundObject.loadAsync(audios[language][numeroName]);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio.');
    } finally {
      setLoading(false);
    }
  };

  const numeroPress = (id) => {
    const numero = numeros.find((item) => item.id === id);
    if (numero) {
      playAudio(numero.name);
    }
  };

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.numerosContainer}>
          {numerosPaginados.map((numero) => (
            <Animatable.View 
              key={numero.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.numeroButtonAnimacao}>
              <TouchableOpacity
                style={styles.numeroButton}
                onPress={() => numeroPress(numero.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.numeroIcon}
                    source={numero.image}
                  />
                  <Text style={styles.numeroName}>{numero.name}</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage}>
          <Image source={require('../../assets/imagens/setaesquerda.png')} style={styles.paginationImage} />
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}/{totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Image source={require('../../assets/imagens/setadireita.png')} style={styles.paginationImage} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numerosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  numeroButton: {
    alignItems: 'center',
  },
  numeroButtonAnimacao: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    width: 160,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
  },
  numeroIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  numeroName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 110,
    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 1 }, 
    textShadowRadius: 2, 
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
  },
});

export default NumerosScreen;
