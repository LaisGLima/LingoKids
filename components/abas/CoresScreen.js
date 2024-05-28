import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { useLanguage } from '../context/LanguageContext'; // Verifique o caminho

const CoresScreen = ({ navigation }) => {
  const { language, audios } = useLanguage();

  const cores = [
    { id: 1, name: 'Amarelo', image: require('../../assets/imagens/cores/amarelo.png') },
    { id: 2, name: 'Azul', image: require('../../assets/imagens/cores/azul.png') },
    { id: 3, name: 'Branco', image: require('../../assets/imagens/cores/branco.png') },
    { id: 4, name: 'Cinza', image: require('../../assets/imagens/cores/cinza.png') },
    { id: 5, name: 'Laranja', image: require('../../assets/imagens/cores/laranja.png') },
    { id: 6, name: 'Marrom', image: require('../../assets/imagens/cores/marrom.png') },
    { id: 7, name: 'Preto', image: require('../../assets/imagens/cores/preto.png') },
    { id: 8, name: 'Rosa', image: require('../../assets/imagens/cores/rosa.png') },
    { id: 9, name: 'Roxo', image: require('../../assets/imagens/cores/roxo.png') },
    { id: 10, name: 'Verde', image: require('../../assets/imagens/cores/verde.png') },
    { id: 11, name: 'Vermelho', image: require('../../assets/imagens/cores/vermelho.png') },
    { id: 12, name: 'Violeta', image: require('../../assets/imagens/cores/violeta.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const coresPorPagina = 6;
  const totalPages = Math.ceil(cores.length / coresPorPagina);

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

  const startIndex = (currentPage - 1) * coresPorPagina;
  const endIndex = Math.min(startIndex + coresPorPagina, cores.length);
  const coresPaginadas = cores.slice(startIndex, endIndex);

  const playAudio = async (corName) => {
    const soundObject = new Audio.Sound();
    setLoading(true);
    try {
      await soundObject.loadAsync(audios[language][corName]);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio.');
    } finally {
      setLoading(false);
    }
  };

  const corPress = (id) => {
    const cor = cores.find((item) => item.id === id);
    if (cor) {
      playAudio(cor.name);
    }
  };

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.coresContainer}>
          {coresPaginadas.map((cor) => (
            <Animatable.View 
              key={cor.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.corButtonAnimacao}>
              <TouchableOpacity
                style={styles.corButton}
                onPress={() => corPress(cor.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.corIcon}
                    source={cor.image}
                  />
                  <Text style={styles.corName}>{cor.name}</Text>
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
        <TouchableOpacity onPress={handlePrevPage} accessibilityLabel="Página anterior">
          <Image source={require('../../assets/imagens/setaesquerda.png')} style={styles.paginationImage} />
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}/{totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage} accessibilityLabel="Próxima página">
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
  coresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  corButton: {
    alignItems: 'center',
  },
  corButtonAnimacao: {
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
  corIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  corName: {
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

export default CoresScreen;
